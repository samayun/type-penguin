class CategoryRepository {
  async getAll() {
    return [
      {
        id: 1,
        name: 'Category 1',
        description: 'Category 1 description',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
      },
      {
        id: 2,
        name: 'Category 2',
        description: 'Category 2 description',
        created_at: '2020-01-01',
        updated_at: '2020-01-01',
      },
    ];
  }

  async findById(id: number) {
    return {
      id: id,
      name: 'Category ' + id,
      description: `Category ${id} description`,
      created_at: '2020-01-01',
      updated_at: '2020-01-01',
    };
  }
}

export const categoryRepository = new CategoryRepository();
