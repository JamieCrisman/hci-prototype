package model

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