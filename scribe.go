package main

import(
	"fmt"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "log"
    "time"
    "errors"
    "crypto/md5"
    "encoding/hex"
    "github.com/apexskier/httpauth"
    "golang.org/x/crypto/bcrypt"
)

type Library struct{
    entries *mgo.Collection
	indices *mgo.Collection
	s *mgo.Session
}

var(
	DB Library
    backend httpauth.MongodbAuthBackend
)

func ScribeSetup(){
	//setting up mongodb
    session, err := mgo.Dial("localhost")
    if (err  != nil){
    	fmt.Println("Oh gosh!")
    	panic(err)
    }
    session.SetMode(mgo.Monotonic, true)
    
    backend, err = httpauth.NewMongodbBackend("mongodb://localhost/", "auth")
    
    hash, err := bcrypt.GenerateFromPassword([]byte("adminadmin"), bcrypt.DefaultCost)
    if err != nil {
        panic(err)
    }
    defaultUser := httpauth.UserData{Username: "admin", Email: "admin@localhost", Hash: hash, Role: "admin"}
    err = backend.SaveUser(defaultUser)

    DB.entries = session.DB("kouen").C("entry")
    DB.indices = session.DB("kouen").C("index")
    DB.s = session

   	index := mgo.Index{
		Key:        []string{"name", "slug"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
    index2 := mgo.Index{
        Key:        []string{"commitid"},
        Unique:     true,
        DropDups:   true,
        Background: true,
        Sparse:     true,
    }
    err = DB.entries.EnsureIndex(index)
    if err != nil {
        panic(err)
    }
	err = DB.indices.EnsureIndex(index2)
	if err != nil {
		panic(err)
	}
	
    // Drop Database if true
    if IsDrop {
    	fmt.Println("Rebuilding Database")
        err = session.DB("kouen").DropDatabase()
        if err != nil {
            panic(err)
        }
        err = DB.entries.Insert(&PageCommit{Name: "Xoka Merveilles", Title: "xoka: commit 1", Slug: "xoka", Active: true, Content: "xoka <b>xoka</b> asdfasdf", CommitID: "abcd",LastUpdated: time.Now(), CreateDate: time.Now()},
                                &PageCommit{Name: "SomeNameOther",Title: "xopa: Commit 1", Slug: "xopa", Active: true, Content: "xopa xopa <i>asdfasdf</i>", CommitID: "abcde", LastUpdated: time.Now(), CreateDate: time.Now()},
                                &PageCommit{Name: "SomeNameOther",Title: "xopa: Commit 2", Slug: "xopa", Active: true, Content: "xopa xopa <i>asdfasdf</i>", CommitID: "abcdf", LastUpdated: time.Now(), CreateDate: time.Now()},
                                &PageCommit{Name: "SomeNameOther2",Title: "apa: commit 1", Slug: "apa", Active: true, Content: "<strong>apa apa asdfasdf</strong>", CommitID: "abcdef", LastUpdated: time.Now(), CreateDate: time.Now()},
                                &PageCommit{Name: "SomeNameOther2",Title: "apa: commit 2", Slug: "apa", Active: true, Content: "Hi there! :D [[img: test.png : testing alt text]]<strong>apa apa asdfasdf</strong>", CommitID: "img", LastUpdated: time.Now(), CreateDate: time.Now()},
                                &PageCommit{Name: "SomeNameOther2",Title: "apa: commit 3", Slug: "apa", Active: true, Content: "Hi there! :D [[entry: xopa : display : all : alt text ]] [[entry: xopa : : abcde]] [[entry: xopa : : abcdf ]] [[entry: xopa : display ]]  <strong>apa apa asdfasdf</strong>", CommitID: "url", LastUpdated: time.Now(), CreateDate: time.Now()})
        
        err = DB.indices.Insert(&PageIndex{Name: "Xoka Merveilles", Slug: "xoka", Active: true, Category: "Project", LastUpdated: time.Now(), CreateDate: time.Now()},
&PageIndex{Name: "SomeNameOther", Slug: "xopa", Category: "Project", Active: true, LastUpdated: time.Now(), CreateDate: time.Now()},
&PageIndex{Name: "SomeNameOther2", Slug: "apa", Category: "Project", Active: true, LastUpdated: time.Now(), CreateDate: time.Now()})
        if err != nil {
            panic(err)
        }
    }
}

func GetAuthBackend() httpauth.MongodbAuthBackend {
    return backend
}

func ScribeShutdown(){
	DB.s.Close();
    backend.Close()
}

func CreateEntry(e *EntryInput) error{
    fmt.Println("adding " + e.Name + " to the database")
    now := time.Now()
    commit := GetMD5Hash( e.Content )[:6]
    
    check := *GetAllCommitsAdmin(e.Slug)
    if(len(check) > 0){
        return errors.New("Already Exists")
    }

    err := DB.indices.Insert(&PageIndex{Name: e.Name, Slug: e.Slug, Active: e.Active, Category: e.Category, LastUpdated: now, CreateDate: now})
    if err != nil {
        return err
    }
    err = DB.entries.Insert(&PageCommit{Name: e.Name, Title: e.Title, Slug: e.Slug, Active: e.Active, Content: e.Content, CommitID: commit, LastUpdated: now, CreateDate: now})
    return err
    
}

func UpdateEntry(e *EntryInput) error{
    fmt.Println("Updating " + e.Name + " to the database")
    now := time.Now()
    err := DB.indices.Update(bson.M{"slug": e.Slug}, bson.M{"$set": bson.M{"active": e.Active, "category": e.Category, "lastupdated": now}})
    if err != nil {
        return err
    }
    return nil
}

func CreateCommit(e *EntryInput) error{
    fmt.Println("adding " + e.Title + " to the database")
    now := time.Now()
    commit := GetMD5Hash( e.Content )[:6]
    
    check := *GetAllCommitsAdminWithID(e.Slug, commit)
    fmt.Println(len(check));
    if(len(check) > 0){
        return errors.New("Already Created")
    }else{
        check = *GetCommitAdmin(e.Slug, "")
    }

    err := DB.entries.Insert(&PageCommit{Name: check[0].Name, Title: e.Title, Slug: check[0].Slug, Active: e.Active, Content: e.Content, CommitID: commit, LastUpdated: now, CreateDate: now})
    return err   
}


func GetCommit(entry string, commit string) *[]PageCommit{
	log.Println("Getting entry " + entry)
	var result PageCommit
    var query bson.M
    if(commit == ""){
        query = bson.M{"slug": entry, "active": true}
    }else if(commit != ""){
        query = bson.M{"slug": entry, "commitid": commit, "active": true}
    }
	DB.entries.Find(query).Sort("-createdate").One(&result)

	return &[]PageCommit{result}
}
func GetCommitAdmin(entry string, commit string) *[]PageCommit{
    log.Println("Getting entry " + entry)
    var result PageCommit
    var query bson.M
    if(commit == ""){
        query = bson.M{"slug": entry}
    }else if(commit != ""){
        query = bson.M{"slug": entry, "commitid": commit}
    }
    DB.entries.Find(query).Sort("-createdate").One(&result)
    return &[]PageCommit{result}
}
func GetAllCommitsAdminWithID(entry string, commit string) *[]PageCommit{
    log.Println("Getting every commit ")
    query := bson.M{"slug": entry, "commitid": commit}
    
    var result []PageCommit
    DB.entries.Find(query).Sort("-createdate").All(&result)
    //log.Println("result: " + len(result))

    return &result
}

func GetAllCommitsAdmin(entry string) *[]PageCommit{
    log.Println("Getting every commit ")
    query := bson.M{"slug": entry}
    
    var result []PageCommit
    DB.entries.Find(query).Sort("-createdate").All(&result)
    //log.Println("result: " + len(result))

    return &result
}

func GetAllCommits(entry string) *[]PageCommit{
    log.Println("Getting every commit ")
    query := bson.M{"slug": entry, "active": true}
    
    var result []PageCommit
    DB.entries.Find(query).Sort("-createdate").All(&result)
    //log.Println("result: " + len(result))

    return &result
}

func GetEntryAdmin(entry string) *[]PageIndex{
    log.Println("Getting every entry ")
    var result []PageIndex
    query := bson.M{}
    if entry != "" {
        query = bson.M{"slug": entry}
    }
    DB.indices.Find(query).All(&result)
    //log.Println("result: " + len(result))

    return &result
}

func GetAllEntries() []PageIndex{
    log.Println("Getting every entry ")
    var result []PageIndex
    DB.indices.Find(bson.M{"active": true}).All(&result)
    //log.Println("result: " + len(result))

    return result
}

func GetAllEntriesAdmin() []PageIndex{
    log.Println("Getting every entry ")
    var result []PageIndex
    DB.indices.Find(nil).All(&result)
    //log.Println("result: " + len(result))

    return result
}

func GetMD5Hash(text string) string {
    hasher := md5.New()
    hasher.Write([]byte(text))
    return hex.EncodeToString(hasher.Sum(nil))
}