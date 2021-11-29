package repository

import (
	"bi-api/domain"

	"gorm.io/gorm"
)

type psqlEntryRepository struct {
	db *gorm.DB
}

func NewPsqlEntryRepository(db *gorm.DB) domain.EntryRepository {
	db.AutoMigrate(&domain.Entry{}, &domain.BiProject{})

	return &psqlEntryRepository{
		db: db,
	}
}

func (r *psqlEntryRepository) GetAll() ([]domain.Entry, error) {
	var entries []domain.Entry
	if err := r.db.Preload("BiProjects").Find(&entries).Error; err != nil {
		return nil, err
	}

	return entries, nil
}

func (r *psqlEntryRepository) GetByID(id int64) (domain.Entry, error) {
	var entry domain.Entry
	if err := r.db.Preload("BiProjects").First(&entry, id).Error; err != nil {
		return entry, err
	}

	return entry, nil
}

func (r *psqlEntryRepository) Create(entry domain.Entry) (domain.Entry, error) {
	if err := r.db.Preload("BiProjects").Create(&entry).Error; err != nil {
		return entry, err
	}

	return entry, nil
}

func (r *psqlEntryRepository) Update(entry domain.Entry) (domain.Entry, error) {
	if err := r.db.Preload("BiProjects").Save(&entry).Error; err != nil {
		return entry, err
	}

	return entry, nil
}

func (r *psqlEntryRepository) Delete(id int64) error {
	if err := r.db.Preload("BiProjects").Delete(domain.Entry{}, id).Error; err != nil {
		return err
	}

	return nil
}
