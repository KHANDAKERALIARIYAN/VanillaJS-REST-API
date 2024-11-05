const OrderModel = require('../models/orderModel');

class OrderController {
    static async create(req, res) {
        try {
            const orderData = {
                ...req.body,
                userId: req.user.id
            };
            const order = await OrderModel.create(orderData);
            res.statusCode = 201;
            res.end(JSON.stringify(order));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    static async getById(req, res) {
        try {
            const id = req.path.split('/')[2];
            const order = await OrderModel.getById(id);
            
            if (!order) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Order not found' }));
                return;
            }
            
            // Check if user is admin or order owner
            if (req.user.role !== 'admin' && order.userId !== req.user.id) {
                res.statusCode = 403;
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            res.end(JSON.stringify(order));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    static async update(req, res) {
        try {
            const id = req.path.split('/')[2];
            const order = await OrderModel.update(id, req.body);
            
            if (!order) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Order not found' }));
                return;
            }
            
            res.end(JSON.stringify(order));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    static async delete(req, res) {
        try {
            const id = req.path.split('/')[2];
            await OrderModel.delete(id);
            res.statusCode = 204;
            res.end();
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}

module.exports = OrderController; 