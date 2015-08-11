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
    Name string
    Slug string
    Active bool
    Category string
    LastUpdated time.Time
    CreateDate time.Time
}

type PageCommit struct {
    Name string //matches index
    Title string //unique(able) to commit
    Slug string
    Content string
    CompiledContent template.HTML
    LastUpdated time.Time
    CreateDate time.Time
    Active bool
    CommitID string
}

type SomeItem struct {
  Active bool `json:"active,omitempty" bson:",omitempty"`
  Category string `json:"category,omitempty" bson:",omitempty"`
  Slug string `json:"slug,omitempty" bson:",omitempty"`
  CommitID string `json:"commitId,omitempty" bson:",omitempty"`
}

type GetOptions struct {
  Page int `json:"offset,omitempty" bson:",omitempty"`
}