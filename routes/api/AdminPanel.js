const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const ApplyTution = require("../../models/ApplyTution");
const mongoose = require("mongoose");
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
  branding: {
    companyName: "FindTutor"
  }
});

// // Passing resources one by one
// const AdminBro = new AdminBro({
//   resources: [ApplyTution]
//   //... other AdminBroOptions
// });

const ADMIN = {
  email: "findtutor@gmail.com",
  password: "rinaroy1234"
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "adminbro",
  cookiePassword: "somepassword"
});

module.exports = router;
