const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/',  async(req, res, category_id) => {
    try {
        const categoryData = await Category.findAll({
            include: [
                {
                    model: Product,
                    // through: category_id
                }
            ]
        })
        res.json(categoryData)
    } catch (err){res.json(err)}
});

router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findOne({
            include: [
                {
                    model: Product,
                }
            ]
        })
        res.json(categoryData)
    } catch (err){
        res.status(500).json(err);
    }
});

router.post('/',  async (req, res) => {
    // create a new category
    try {
        const newCategory = await Category.create(req.body);
        res.status(200).json(newCategory);
    }catch (error){
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try{
        const updatedCategory = await Category.update({
            id: req.params.id,
            category_name: req.body.category_name
        }, {
            where: {
                id: req.params.id
            }
        });
        if(!updatedCategory[0]) {
            res.status(404).json({message:"The category with that id cannot be found!"});
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try{
        const deletedCategory = await Category.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if(!deletedCategory) {
            res.status(404).json({message:"The category with that id cannot be found!"});
        }
        res.status(200).json(deletedCategory);
    }catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
