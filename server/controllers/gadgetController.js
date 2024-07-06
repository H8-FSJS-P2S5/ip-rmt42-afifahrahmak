const { response } = require("express")
const { Gadget, User, Category, Spec, Review } = require("../models")
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const { v4: uuidv4 } = require('uuid')
const nodeMailer = require("nodemailer")
const axios = require('axios');
require("dotenv").config();




class Controller {

    static async nodeMailer(req, res, next) {

        try {
            const transporter = nodeMailer.createTransport({
                host : "127.0.0.1",
                port: 3000,
                secure: true,
                auth: {
                    user: "kgibran53@gmail.com",
                    pass: "kahlilgibra"
                }
    
            })
    
            const info = await transporter.sendMail({
                from: "GT Gadgets",
                to : "kgibran53@gmail.com",
                subject: "Incoming New Phone!",
                text: 'New phone has coming, lets checkout our website'

            })
    
            console.log(info.messageId);
        } catch (error) {
            console.log(error)
        }


    }

    static async uploadImage(req, res, next) {
        try {
            let gadget = await Gadget.findByPk(req.params.id)

            if(!gadget){
                throw({name: "NotFound"})
            }
            
            console.log("req.files >>>> ",req.file)
            // cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
            // { public_id: "olympic_flag" }, 
            // function(error, result) {console.log(result); }); 
            
    
            cloudinary.config({ 
              cloud_name: 'dvklyswe4', 
              api_key: process.env.api_key, 
              api_secret: process.env.api_secret
            });
    
            let streamUpload = (req) => {
                let uuid = uuidv4()
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream( {public_id : uuid , folder: "blog_web"},
                      (error, result) => {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(error);
                        }
                      }
                    );
        
                  streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
        
            async function upload(req) {
                 let result = await streamUpload(req);
                console.log(result, "<<<<<<<<<<<<<< ini result ");
    
                await gadget.update({ imgUrl : result.secure_url})

                res.status(200).json({ message: `Image Gadget success to update`})

            }
        
            upload(req);
    
        } catch (error) {
            next(error)
        }
 
        
    }

    static async createGadget(req, res, next) {
        try {
            const {name, description, imgUrl, categoryId} = req.body

            const gadget = await Gadget.create({name, description, imgUrl, categoryId})
            
            res.status(201).json(gadget)
        } catch (error) {
            next(error)
        }
    }

    static async createGadgetSpec(req, res, next) {
        try {
            const {weight, display, os, chipset, memory, camera, battery, network} = req.body

            const spec = await Spec.create({weight, display, os, chipset, memory, camera, battery, network, gadgetId : req.params.id})
           
            res.status(201).json(spec)
        } catch (error) {
            next(error)
        }
    }

    static async addRating(req, res, next) {
        try {
            const gadget = await Gadget.findByPk(req.params.id)      
            await gadget.update({rating: gadget.rating+1})    
            res.status(201).json(gadget)
        } catch (error) {
            next(error)
        }
    }

    static async getAllGadget(req, res, next) {
        try {
            const gadget = await Gadget.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(gadget)

            if(!gadget) {
                throw({name : "NotFound"})
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getAllGadgetPub(req, res, next) {
        try {
            console.log(req.query)
            const {page=1, categoryId, search} = req.query
            const limit = 9
            const offset = (page - 1) * limit

            let filter
            if (categoryId) {
                filter.categoryId = categoryId
            }
            if (search) {
                console.log(search)
                filter.title = { [Op.iLike]: `%${search}%` }
            }

            const gadget = await Gadget.findAll({
                limit: limit,
                offset: offset,
                where: filter,
                include: [Category],
                order: [['id', 'ASC']]
            })
            res.status(200).json(gadget)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getGadgetPub(req, res, next) {
        try {
            const gadget = await Gadget.findByPk(req.params.id, {
                include: [Spec, Category]
            })
            if(!gadget) {
                throw({name : "NotFound"})
            }
            res.status(200).json(gadget)

        } catch (error) {
            
            next(error)
        }
    }
    
    static async createReview(req, res) {
        try {
            const {gadgetId} = req.params.gadgetId
            const {content, userId} = req.body
            const review = await Review.create({content, gadgetId, userId})
            res.status(201).json(review)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


    static async getGadget(req, res, next) {
        try {
            const gadget = await Gadget.findByPk(req.params.id,
                {
                    include: [Spec, Category]
                })
            if(!gadget) {
                throw({name : "NotFound"})
            }
            res.status(200).json(gadget)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async googleShopping(req, res, next) {
        const gadget = await Gadget.findByPk(req.params.id)
        
        try {
            const url = "https://www.searchapi.io/api/v1/search";
            const params = {
                "engine": "google_shopping",
                "q": gadget.name,
                "location": "California,United States",
                "api_key": process.env.G_SHOP_API
            };
    
            const response = await axios.get(url, { params });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    static async editGadget(req, res, next) {
        try {
            let gadget = await Gadget.findByPk(req.params.id)
            if(!gadget) throw ({name : "NotFound"})
            
            await gadget.update(req.body)
            // res.send(gadget)
            res.status(200).json({ message: `Gadget with id ${req.params.id} has been updated`})
        } catch (error) {
            next(error)
           
        }
    }

    static async deleteGadget(req, res, next) {
        try {
            let gadget = await Gadget.findByPk(req.params.id)
            if(!gadget) throw ({name : "NotFound"})
            
            await gadget.destroy()
            // res.send(gadget)
            res.status(200).json({ message: `Gadget with id ${req.params.id} has been deleted`})
           
        } catch (error) {
            next(error)
           
        }
    }

    



}

module.exports = Controller