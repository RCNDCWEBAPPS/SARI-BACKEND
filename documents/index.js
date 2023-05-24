const { GeneratorPdf } = require("../controllers/salesController")
module.exports = (products) => {
  // console.log("templte", products)
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
        <h1 class="text-xl font-semibold text-gray-900">Exported data</h1>
        <p class="mt-2 text-sm text-gray-700">From : 02/23/2020</p>
        <p class="mt-2 text-sm text-gray-700">To : 02/23/2020</p>
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

  products.map((item) => {
    const row = `
  <tr>
  <td class="py-2 pl-2 pr-3 text-xs text-gray-900 sm:pl-6">${item.product.name}</td>
  <td class="px-2 py-2 text-xs text-gray-500">${item.quantity}</td>
  <td class="px-2 py-2 text-xs text-gray-500">${item.product.price}</td>
  <td class="px-2 py-2 text-xs text-gray-500">${item.product.price}</td>
  <td class="px-2 py-2 text-xs text-gray-500">${new Date(item.date).toLocaleString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} </td>
  <td class="px-2 py-2 text-xs text-gray-500">${item.product.quantity}</td>
  <td class="px-2 py-2 text-xs text-gray-500">${item.product.color} / ${item.product.modelNo}</td>
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




  return page = pageFirstHalf + rows.join(`\n`) + pageSecondHalf
  GeneratorPdf(page)
}