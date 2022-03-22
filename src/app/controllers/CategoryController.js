const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if(!name){
      return response.status(400).json({ error: 'Name is required'});
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async show(request, response){
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);

    if(!category){
      response.status(404).json({ error: 'Category not found!' });
    }

    response.json(category);
  }

  async update(request, response){
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoriesRepository.findById(id);

    if(!category){
      response.status(404).json({ error: 'Category not found!' });
    }

    if(!name){
      return response.status(400).json({ error: 'Name is required'});
    }

    const categoryUpdated = await CategoriesRepository.update(id, {name});

    response.json(categoryUpdated);
  }

  async delete(request, response){
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if(!category){
      response.status(404).json({ error: 'Category not found!' });
    }

    await CategoriesRepository.delete(id);

    response.sendStatus(204);

  }
}

module.exports = new CategoryController();
