package ciel

import(
	"fmt"
//    "gopkg.in/mgo.v2"
//    "gopkg.in/mgo.v2/bson"
//    "log"
//    "github.com/apexskier/httpauth"
//    "golang.org/x/crypto/bcrypt"
    "html/template"
    "strings"
)

func CompileContent(content string) template.HTML{
    ind := strings.Index(content, "[[")
    for( ind != -1){
        //fmt.Println("contains it")
        //fmt.Println(ind)
        endind := strings.Index(content, "]]")+2

        substr := content[ind+2:endind-2] 
        fmt.Println(substr)

        x := strings.Split(substr, ":")
        if(x[0] == "img"){
            fmt.Println("WE HAVE TO PARSE AN IMAGE")
            substr = ParseImage(substr)
        }else if(x[0] == "entry"){
            fmt.Println("WE HAVE TO PARSE AN ENTRY")
            substr = ParseEntry(substr)
        }else{
            fmt.Println("We don't know what you're trying to edit")
            substr = content[ind:endind]
        }

        content = strings.Join( []string{content[:ind], substr, content[endind:]}, "" )
        ind = strings.Index(content, "[[")
    }

    return template.HTML( content )
}


//[[img: url : alt]]
func ParseImage(tag string) string {
    y := strings.Split(tag, ":")
    address := strings.TrimSpace(y[1])
    alt := ""
    if(len(y) > 2){
        alt = "alt=\""+strings.TrimSpace(y[2])+"\""
    }
    ret := "<iron-image "+alt+" preload fade src=\"/assets/images/"+address+"\"></iron-image>"
    return ret
}

//[[entry: entryname : displayname : commit : alt]]
func ParseEntry(tag string) string {
    y := strings.Split(tag, ":")
    entry := strings.TrimSpace(y[1])
    alt := ""
    name := entry
    commit := ""
    if(len(y) >= 3 && strings.TrimSpace(y[2]) != ""){
        name = strings.TrimSpace(y[2])
    }
    if(len(y) >= 4 && strings.TrimSpace(y[3]) != ""){
        commit = "/"+strings.TrimSpace(y[3])
        //fmt.Println("!!!!!\ncommit: " + commit)
    }
    if(len(y) >= 5 && strings.TrimSpace(y[4]) != ""){
        alt = "alt=\""+strings.TrimSpace(y[4])+"\""
    }
    ret := "<a "+alt+" href=\"/"+entry+commit+"\">"+name+"</a>"
    return ret
}