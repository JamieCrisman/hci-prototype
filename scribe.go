package main

import(
	"fmt"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "log"
)

type Library struct{
	col *mgo.Collection
	s *mgo.Session
}

var(
	DB Library
)

func ScribeSetup(){
	//setting up mongodb
    session, err := mgo.Dial("localhost")
    if (err  != nil){
    	fmt.Println("Oh gosh!")
    	panic(err)
    }
    session.SetMode(mgo.Monotonic, true)
    
    DB.col = session.DB("kouen").C("entry")
    DB.s = session

   	index := mgo.Index{
		Key:        []string{"name", "slug"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
	err = DB.col.EnsureIndex(index)
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
        err = DB.col.Insert(&PageEntry{Name: "Xoka Merveilles", Slug: "xoka", Active: true, Category: "Projects", Content: "xoka <b>xoka</b> asdfasdf", LastUpdated: 0, CreateDate: 0},
&PageEntry{Name: "SomeNameOther", Slug: "xopa", Active: true, Category: "Projects", Content: "xopa xopa <i>asdfasdf</i>", LastUpdated: 0, CreateDate: 0},
&PageEntry{Name: "SomeNameOther2", Slug: "apa", Active: true, Category: "Projects", Content: "<strong>apa apa asdfasdf</strong>", LastUpdated: 0, CreateDate: 0})
        if err != nil {
            panic(err)
        }
    }
}

func ScribeShutdown(){
	DB.s.Close();
}

func GetEntry(entry string) PageEntry{
	log.Println("Getting entry " + entry)
	var result PageEntry
	DB.col.Find(bson.M{"slug": entry}).One(&result)
	log.Println("result: " + result.Name)

	return result
}

func GetAllEntries() []PageEntry{
    log.Println("Getting every entry ")
    var result []PageEntry
    DB.col.Find(nil).All(&result)
    //log.Println("result: " + len(result))

    return result
}