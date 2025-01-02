

const Config = {

    USER_TYPES:{
        admin : 1,
        bdm : 2,
        distributor: 3
    },

    ACCESS_PAGES:{
        admin : ['/dashboard/pageOne','/dashboard/pageTwo','/dashboard/pageThree','/dashboard/pageFour'],
        bdm : ['/dashboard/pageThree']
    },

    URL:{
        apiBaseUrl: "http://localhost/roadmate_saas_backend/public/api/admin/"
    }
    
}


export default Config;