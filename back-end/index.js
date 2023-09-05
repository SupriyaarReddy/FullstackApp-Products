const express = require('express');
const cors = require("cors")
require('./db/config');
const User = require("./db/User");
const Products = require('./db/Products.js');

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", verifyToken, async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong, Please try after sometime" })
        }
        resp.send({ user, auth: token })
    })
})

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try after sometime" })
                }
                resp.send({ user, auth: token })
            })

        } else {
            resp.send({ result: 'No User Found' })
        }

    }


})

app.post("/add-product",verifyToken, async (req, resp) => {
    let product = new Products(req.body);
    let result = await product.save();
    resp.send(result)

})

app.get("/products",verifyToken,  async (req, resp) => {
    let products = await Products.find();
    if (products.length > 0) {
        resp.send(products);    
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/product/:id",verifyToken, async (req, resp) => {
    const result = await Products.deleteOne({ _id: req.params.id })
    resp.send(result)
})

app.get("/product/:id",verifyToken, async (req, resp) => {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No Record Found" })
    }
})

app.put("/product/:id",verifyToken, async (req, resp) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
})

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Products.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result)
})


function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide valid token" })
            } else{
                next();
            }
        })
    } else {
        resp.status(403).send({ result: "Please add token with header" })
    }
    
}



app.listen(5000)

// Api postman
// const app = express();
// app.post("/register", (req, resp) => {
//     resp.send(req.body)
// })