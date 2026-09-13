import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse"; 
export default function BulkUploadPage() {
  const navigate = useNavigate();

  const [csvFile, setCsvFile] = useState(null);
  const [imagesZip, setImagesZip] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const downloadTemplate = () => {
  const headers = [
    "name",
    "description",
    "price",
    "oldPrice",
    "category",
    "gender",
    "brand",
    "stock",
    "rating",
    "discount",
    "featured",
    "image",
  ];

  const exampleProduct = [
    "Classic Black Sunglasses",
    "Stylish black sunglasses",
    "4500",
    "5000",
    "Sunglasses",
    "Men",
    "NAKASA",
    "20",
    "0",
    "10",
    "true",
    "classic-black.jpg",
  ];

  const csvContent = [
    headers.join(","),
    exampleProduct.join(","),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "nakasa-product-template.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const validateProducts = () => {
  if (!csvFile) {
    alert("Please select a CSV file first.");
    return;
  }

  setValidating(true);

  Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const validProducts = [];
      const errors = [];

      results.data.forEach((product, index) => {
        const rowNumber = index + 2;
        const rowErrors = [];

        if (!product.name?.trim()) {
          rowErrors.push("Product name is required");
        }

        if (!product.description?.trim()) {
          rowErrors.push("Description is required");
        }

        if (
          !product.price ||
          Number.isNaN(Number(product.price)) ||
          Number(product.price) <= 0
        ) {
          rowErrors.push("Valid price is required");
        }

        if (!product.category?.trim()) {
          rowErrors.push("Category is required");
        }

        const gender = product.gender?.trim();

        if (!["Men", "Women", "Unisex"].includes(gender)) {
          rowErrors.push(
            "Gender must be Men, Women, or Unisex"
          );
        }

        if (
          product.stock &&
          (
            Number.isNaN(Number(product.stock)) ||
            Number(product.stock) < 0
          )
        ) {
          rowErrors.push("Stock must be 0 or greater");
        }

        if (
          product.discount &&
          (
            Number.isNaN(Number(product.discount)) ||
            Number(product.discount) < 0 ||
            Number(product.discount) > 100
          )
        ) {
          rowErrors.push(
            "Discount must be between 0 and 100"
          );
        }

        if (
          product.rating &&
          (
            Number.isNaN(Number(product.rating)) ||
            Number(product.rating) < 0 ||
            Number(product.rating) > 5
          )
        ) {
          rowErrors.push(
            "Rating must be between 0 and 5"
          );
        }

        if (!product.image?.trim()) {
          rowErrors.push("Image filename is required");
        }

        if (rowErrors.length > 0) {
          errors.push({
            row: rowNumber,
            name: product.name || "Unknown Product",
            errors: rowErrors,
          });
        } else {
          validProducts.push({
            ...product,
            price: Number(product.price),
            oldPrice: product.oldPrice
              ? Number(product.oldPrice)
              : null,
            stock: product.stock
              ? Number(product.stock)
              : 0,
            rating: product.rating
              ? Number(product.rating)
              : 0,
            discount: product.discount
              ? Number(product.discount)
              : 0,
            featured:
              String(product.featured)
                .toLowerCase()
                .trim() === "true",
            brand:
              product.brand?.trim() || "NAKASA",
          });
        }
      });

      setValidationResult({
        total: results.data.length,
        valid: validProducts,
        errors,
      });

      setValidating(false);
    },

    error: (error) => {
      console.error("CSV parse error:", error);

      alert("Failed to read CSV file.");

      setValidating(false);
    },
  });
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              NAKASA ADMIN
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Bulk Product Upload
            </h1>

            <p className="mt-2 text-gray-500">
              Upload many products at once using a CSV file and product images.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="rounded-lg border bg-white px-5 py-3 font-semibold hover:bg-gray-50"
          >
            ← Back to Admin
          </button>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            How bulk upload works
          </h2>

          <div className="mt-5 space-y-3 text-sm text-gray-600">
            <p>1. Download the NAKASA product CSV template.</p>

            <p>
              2. Enter all product information into the spreadsheet.
            </p>

            <p>
              3. Add the matching product images into a ZIP file.
            </p>

            <p>
              4. Upload both files below.
            </p>

            <p>
              5. NAKASA will validate the products before importing them.
            </p>
          </div>
        </div>

        {/* TEMPLATE */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-lg font-bold">
                Product Template
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Use our template so the column names are correct.
              </p>
            </div>

            <button
                type="button"
                onClick={downloadTemplate}
                className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
              >
                Download CSV Template
            </button>

          </div>
        </div>

        {/* CSV UPLOAD */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
            1. Upload Product CSV
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select the spreadsheet containing your product information.
          </p>

          <div className="mt-5">
            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setCsvFile(e.target.files?.[0] || null)
              }
              className="block w-full rounded-lg border bg-gray-50 p-3"
            />
          </div>

          {csvFile && (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Selected: {csvFile.name}
            </div>
          )}

        </div>

        {/* IMAGE ZIP */}
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold">
            2. Upload Product Images
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Put all product images into one ZIP file.
          </p>

          <div className="mt-5">
            <input
              type="file"
              accept=".zip"
              onChange={(e) =>
                setImagesZip(e.target.files?.[0] || null)
              }
              className="block w-full rounded-lg border bg-gray-50 p-3"
            />
          </div>

          {imagesZip && (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              Selected: {imagesZip.name}
            </div>
          )}

        </div>

        {/* BUTTON */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">

                <button
                  type="button"
                  onClick={validateProducts}
                  disabled={!csvFile || !imagesZip || validating}
                  className="w-full rounded-lg bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {validating
                    ? "Validating..."
                    : "Validate Products"}
                </button>

                    {validationResult && (
  <div className="mt-6">

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

      <div className="rounded-lg bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-500">
          Total Products
        </p>

        <p className="mt-1 text-2xl font-bold">
          {validationResult.total}
        </p>
      </div>

      <div className="rounded-lg bg-green-50 p-4 text-center">
        <p className="text-sm text-green-600">
          Valid Products
        </p>

        <p className="mt-1 text-2xl font-bold text-green-700">
          {validationResult.valid.length}
        </p>
      </div>

      <div className="rounded-lg bg-red-50 p-4 text-center">
        <p className="text-sm text-red-600">
          Errors
        </p>

        <p className="mt-1 text-2xl font-bold text-red-700">
          {validationResult.errors.length}
        </p>
      </div>

    </div>

    {validationResult.errors.length > 0 && (
      <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">

        <h3 className="font-bold text-red-700">
          Products with errors
        </h3>

        <div className="mt-4 space-y-4">

          {validationResult.errors.map(
            (item, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4"
              >
                <p className="font-semibold">
                  Row {item.row} — {item.name}
                </p>

                <ul className="mt-2 list-disc pl-5 text-sm text-red-600">
                  {item.errors.map(
                    (error, errorIndex) => (
                      <li key={errorIndex}>
                        {error}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )
          )}

        </div>
      </div>
    )}

  </div>
)}

          {!csvFile || !imagesZip ? (
            <p className="mt-3 text-center text-sm text-gray-400">
              Select both the CSV file and image ZIP file first.
            </p>
          ) : null}

        </div>

      </div>
    </div>
  );
}