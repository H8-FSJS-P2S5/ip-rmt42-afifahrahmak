const axios = require("axios");

class MainController{

    static async fetchAgents(req, res, next) {
        try {
        //   const { page = 1 } = req.query;
          const { data } = await axios({
            method: "GET",
            url: "https://valorant-api.com/v1/agents",
          });
    
          const agents = data.data.map((el) => {
            return {
              id: el.uuid,
              name: el.displayName,
              description: el.description,
              icon: el.displayIcon,
              image: el.fullPortrait,
              role: el.role ? el.role.displayName : null,
              roleIcon: el.role ? el.role.displayIcon : null,
            };
          });
        //   let filteredAgents = agents.filter((agent) => agent.role !== null);
        //   if (page) {
        //     let limit = 8;
        //     let index = (page - 1) * limit;
        //     const pageAgents = filteredAgents.slice(index, index + limit);
        //     return res.status(200).json(pageAgents);
        //   }
    
          res.status(200).json(agents);
        } catch (error) {
          console.log(error);
          next(error);
        }
      }


      static async fetchBundles(req, res, next) {
        try {
        //   const { page = 1 } = req.query;
          const { data } = await axios({
            method: "GET",
            url: "https://valorant-api.com/v1/bundles",
          });
    
          const bundles = data.data.map((el) => {
            return {
              id: el.uuid,
              name: el.displayName,
              image: el.displayIcon,
              imageVertical: el.verticalPromoImage,
            };
          });
    
        //   if (page) {
        //     let limit = 16;
        //     let index = (page - 1) * limit;
        //     const pageBundles = bundles.slice(index, index + limit);
        //     return res.status(200).json(pageBundles);
        //   }
    
          res.status(200).json(bundles);
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
    

}

module.exports = MainController