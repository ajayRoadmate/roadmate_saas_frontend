
const Config = {

    USER_TYPES:{
        admin : 1,
        bdm : 2,
        distributor: 3,
        channelPartner:4
    },

    ACCESS_PAGES:{
        admin : ['/dashboard/manageDistributors','/dashboard/manageExecutives','/dashboard/manageChannelPartners','/dashboard/manageSubscriptions','/dashboard/manageShops','/dashboard/manageOrders','/dashboard/manageOrderDetails','/dashboard/viewProducts','/dashboard/viewProductDetails','/dashboard/addProduct','/dashboard/updateProduct','/dashboard/adminHome'],
        bdm : ['/dashboard/pageThree'],
        distributor : ['/distributor/manageShops','/distributor/manageExecutives','/distributor/viewProducts','/distributor/viewProductDetails','/distributor/addProduct','/distributor/updateProduct','/distributor/manageOrders','/distributor/manageOrderDetails','/distributor/info','/distributor/manageBrands'],
        channelPartner: ['/channelPartner/manageDistributors', '/channelPartner/info']
    },

    URL:{
        apiBaseUrl: "http://localhost/roadmate_saas_backend/public/api/admin/",
        // apiBaseUrl: "http://159.89.160.73/api/admin/"
    }
    
}


export default Config;