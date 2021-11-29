package domain

type Entry struct {
	ID         int64       `gorm:"primaryKey" json:"id"`
	Country    string      `gorm:"type:varchar(255);not null" json:"country"`
	BIName     string      `gorm:"type:varchar(255);not null" json:"bi"`
	BiProjects []BiProject `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"projects"`
}

type BiProject struct {
	ID      int64 `gorm:"primaryKey" json:"id"`
	EntryID int64 `json:"-"`
	Year    int64 `gorm:"type:int;not null" json:"year"`
	Num     int64 `gorm:"type:int;not null" json:"number"`
	Sum     int64 `gorm:"type:int;not null" json:"sum"`
}

type EntryUsecase interface {
	GetAll() ([]Entry, error)
	GetByID(id int64) (Entry, error)
	Create(entry Entry) (Entry, error)
	Update(entry Entry) (Entry, error)
	Delete(id int64) error
}

type EntryRepository interface {
	GetAll() ([]Entry, error)
	GetByID(id int64) (Entry, error)
	Create(entry Entry) (Entry, error)
	Update(entry Entry) (Entry, error)
	Delete(id int64) error
}
