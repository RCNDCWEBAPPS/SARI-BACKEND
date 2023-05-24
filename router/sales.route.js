const express = require("express");

const { sales } = require("../controllers");
const { auth } = require("../_middleware");
const route = express.Router();
const fs = require("fs");
const puppeteer = require('puppeteer');
const pdfTemplate = require('../documents/index')
/**
 *admin: manage user
 */
route.post(
  "/sales-add-products",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.addProducts
);
route.get(
  "/sales-list-products",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.viewProducts
);
route.patch(
  "/sales-update-product/:id",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.updateProduct
)
route.post(
  "/:quantity/sales-update-productQuantity/:id",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.updateProductQuantity
);
route.post(
  "/:quantity/sales-removeProduct/:productId",

  sales.addSalesProduct
);
route.post(
  "/sales-add-category",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.addCategory
);
route.get(
  "/sales-list-categorie",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.viewCategory
);
route.patch(
  "/sales-update-categorie/:id",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.updateCategorie
);

route.post("/create-pdf", async (req, res,) => {
  const { product, minTime, maxTime } = req.body

  // This come from the api
  const data = product
  console.log("data", data)
  async function GeneratePdf(html) {
    // Launch the browser.
    const browser = await puppeteer.launch();

    // Create a new page.
    const page = await browser.newPage();
    await page.setViewport({
      width: 3508,
      height: 2480,
      deviceScaleFactor: 1,
    });
    await page.setContent(html);



    const generatedName = new Date().toLocaleString("en-us", { year: "numeric", month: "long", day: "numeric", second: 'numeric' })
    const folder_path = `/export/${generatedName}`
    const fileName = `report.pdf`;

    // check if the folder exist 
    if (!fs.existsSync(folder_path)) {
      fs.mkdirSync(folder_path, { recursive: true });
    }

    // Save the HTML content as a PDF file.
    await page.pdf({ path: folder_path + "/" + fileName });
    // Close the browser.
    await browser.close();
    console.log(folder_path + "/" + fileName)
    return res.status(200).download(`${folder_path}/${fileName}`)
  }

  const pageFirstHalf = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Document</title>
  </head>
  <body class="py-[80px] px-[30px]" >
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Sari weekly sales report From :${new Date(minTime).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} - ${new Date(maxTime).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} </h1>
         
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-2 pl-2 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" class="px-2 py-2 text-left text-xs font-semibold text-gray-900">Quantity</th>
                    <th scope="col" class="px-2 py-2 text-left text-xs font-semibold text-gray-900">Price</th>
                    <th scope="col" class="px-2 py-2 text-left text-xs font-semibold text-gray-900">Total</th>
                    <th scope="col" class="px-2 py-2 text-left text-xs font-semibold text-gray-900">Date</th>
                    <th scope="col" class="px-2 py-2 text-left text-xs font-semibold text-gray-900">Balance</th>
                    <th scope="col" class="px-2 py-2 text-left text-xs font-semibold text-gray-900">Code</th>
                    <th scope="col" class="py-2 pl-2 text-left text-xs font-semibold text-gray-900 sm:pl-6">Comment</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
  `
  const rows = []

  data.map((item) => {
    const row = `
    <tr>
    <td class="py-2 pl-2 pr-3 text-xs text-gray-900 sm:pl-6">${item.product.name}</td>
    <td class="px-2 py-2 text-xs text-gray-500">${item.quantity}</td>
    <td class="px-2 py-2 text-xs text-gray-500">${item.price}</td>
    <td class="px-2 py-2 text-xs text-gray-500">${item.price * item.quantity}</td>
    <td class="px-2 py-2 text-xs text-gray-500">${new Date(item.date).toLocaleString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} </td>
    <td class="px-2 py-2 text-xs text-gray-500">${item.product.quantity}</td>
    <td class="px-2 py-2 text-xs text-gray-500">${item.color} / ${item.product.modelNo}</td>
    <td class="py-2 pl-2 text-xs text-gray-900 ">${item.comment}</td>
    </tr>
    `
    rows.push(row)
  })

  const pageSecondHalf = `
  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `
  const page = pageFirstHalf + rows.join(`\n`) + pageSecondHalf

  return GeneratePdf(page)

});

route.get(
  "/sales-list-saleProducts",
  auth.requireSignin,
  auth.authMiddleware,
  auth.checkSales,
  sales.viewSaleProduct
);
module.exports = route;
