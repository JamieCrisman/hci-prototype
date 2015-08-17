package ciel

import (
    "time"
    "html/template"
)

type EntryInput struct{
  Name string
  Title string
  Active bool
  Category string
  Slug string
  Content string
  CommitID string
}

type PageIndex struct {
    Name string `json:"name,omitempty" bson:",omitempty"`
    Slug string `json:"slug,omitempty" bson:",omitempty"`
    Active bool `json:"active,omitempty" bson:",omitempty"`
    Category string `json:"category,omitempty" bson:",omitempty"`
    LastUpdated time.Time `json:"lastUpdated,omitempty" bson:",omitempty"`
    CreateDate time.Time `json:"createDate,omitempty" bson:",omitempty"`
}

type PageCommit struct {
    Name string `json:"name,omitempty" bson:",omitempty"`
    Title string `json:"title,omitempty" bson:",omitempty"`
    Slug string `json:"slug,omitempty" bson:",omitempty"`
    Content string `json:"content,omitempty" bson:",omitempty"`
    CompiledContent template.HTML `json:"compiledContent,omitempty" bson:",omitempty"`
    LastUpdated time.Time `json:"lastUpdated,omitempty" bson:",omitempty"`
    CreateDate time.Time `json:"createDate,omitempty" bson:",omitempty"`
    Active bool `json:"active,omitempty" bson:",omitempty"`
    CommitID string `json:"commitId,omitempty" bson:",omitempty"`
}

type ApiGetResult struct {
  Offset int `json:"offset,omitempty" bson:",omitempty"`
  Count int `json:"count,omitempty" bson:",omitempty"`
  Commits []PageCommit `json:"commits,omitempty" bson:",omitempty"`
  Entries []PageIndex `json:"entries,omitempty" bson:",omitempty"`
}

type SomeItem struct {
  Active bool `json:"active,omitempty" bson:",omitempty"`
  Category string `json:"category,omitempty" bson:",omitempty"`
  Slug string `json:"slug,omitempty" bson:",omitempty"`
  CommitID string `json:"commitId,omitempty" bson:",omitempty"`
}

type GetOptions struct {
  Page int `json:"page,omitempty" bson:",omitempty"`
  All bool `json:"all,omitempty" bson:",omitempty"`
  Admin bool `json:"admin,omitempty" bson:",omitempty"`
}