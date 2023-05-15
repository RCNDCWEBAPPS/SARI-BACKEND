const express = require("express");
const { auth } = require("../controllers");
const { adminAuth: adminAuthCtrl } = require("../admin-controller");
const { authAdmin } = require("../_middleware");
const route = express.Router();
/**
 * admin route
 */
route.post("/admin-signup", authAdmin.checkRecord, adminAuthCtrl.adminSignup);
route.post("/admin-signin", adminAuthCtrl.adminSignin);
route.get("/signout", adminAuthCtrl.signout);
route.post("/admin-forgotPassword", adminAuthCtrl.adminforgotPassword);
app.post("/pdf", async (req, res) => {
    // Calling the template render func with dynamic data
    const result = await createTemplate(req.body);
  
    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  
    // Streaming our resulting pdf back to the user
    result.pipe(res);
});

/**
 * users route
 */
route.post("/pre-signup",auth.preSignup );
route.post("/signup", auth.signup);
route.post("/signin", auth.signin);
route.put("/forgot-password", auth.forgotPassword);

module.exports = route;
