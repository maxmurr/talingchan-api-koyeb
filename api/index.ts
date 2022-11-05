import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

var express = require("express");
var cors = require("cors");
var app = express();

app.use(express.json());
app.use(cors());

app.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.json({ msg: "Talingchan API" });
});

// Customer

app.post(
  "/customers",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { CName, CTel } = req.body;
      const createdCustomer = await prisma.customer.create({
        data: {
          CName,
          CTel,
        },
      });
      res.json({
        createdCustomer,
        message: `Created customer with CID: ${createdCustomer.CID}, successfully`,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

app.get(
  "/customers",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await prisma.customer.findMany({
        include: { invoices: true },
      });
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/customers/:CID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { CID } = req.params;
      const customer = await prisma.customer.findUnique({
        where: {
          CID: Number(CID),
        },
      });
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/customers_tel/:CTel",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { CTel } = req.params;
      const customer = await prisma.customer.findUnique({
        where: {
          CTel: CTel,
        },
      });
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/customers/:CID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { CName, CTel } = req.body;
      const { CID } = req.params;
      const updatedCustomer = await prisma.customer.update({
        where: {
          CID: Number(CID),
        },
        data: {
          CName,
          CTel,
        },
      });
      res.status(200).json({
        updatedCustomer,
        message: `Updated customer with CID: ${updatedCustomer.CID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/customers/:CID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { CID } = req.params;
      const deletedCustomer = await prisma.customer.delete({
        where: {
          CID: Number(CID),
        },
      });
      res.status(200).json({
        deletedCustomer,
        message: `Deleted customer with CID: ${deletedCustomer.CID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

// Employee

app.post(
  "/employees",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { EmpName, EmpPosition, EmpTel, EmpPassword } = req.body;
      const createdEmployee = await prisma.employee.create({
        data: {
          EmpName,
          EmpPosition,
          EmpTel,
          EmpPassword,
        },
      });
      res.json({
        createdEmployee,
        message: `Created employee with EmpID: ${createdEmployee.EmpID}, successfully`,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

app.get(
  "/employees",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await prisma.employee.findMany();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/employees/:EmpID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { EmpID } = req.params;
      const employee = await prisma.employee.findUnique({
        where: {
          EmpID: Number(EmpID),
        },
      });
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/employees/:EmpID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { EmpName, EmpPosition, EmpTel, EmpPassword } = req.body;
      const { EmpID } = req.params;
      const updatedEmployee = await prisma.employee.update({
        where: {
          EmpID: Number(EmpID),
        },
        data: {
          EmpName,
          EmpPosition,
          EmpTel,
          EmpPassword,
        },
      });
      res.status(200).json({
        updatedEmployee,
        message: `Updated employee with EmpID: ${updatedEmployee.EmpID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/employees/:EmpID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { EmpID } = req.params;
      const deletedEmployee = await prisma.employee.delete({
        where: {
          EmpID: Number(EmpID),
        },
      });
      res.status(200).json({
        deletedEmployee,
        message: `Deleted employee with EmpID: ${deletedEmployee.EmpID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

// Product

app.post(
  "/products",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PName, PPrice, PDescription, PPicture, PInStock, UID } = req.body;
      const createdProduct = await prisma.product.create({
        data: {
          PName,
          PPrice,
          PPicture,
          PDescription,
          PInStock,
          UID,
        },
      });
      res.json({
        createdProduct,
        message: `Created product with PID: ${createdProduct.PID}, successfully`,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

app.get(
  "/products",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/products/:PID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PID } = req.params;
      const product = await prisma.product.findUnique({
        where: {
          PID: Number(PID),
        },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/products/:PID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PName, PPrice, PPicture, PDescription, PInStock } = req.body;
      const { PID } = req.params;
      const updatedProduct = await prisma.product.update({
        where: {
          PID: Number(PID),
        },
        data: {
          PName,
          PPrice,
          PPicture,
          PDescription,
          PInStock,
        },
      });
      res.status(200).json({
        updatedProduct,
        message: `Updated product with PID: ${updatedProduct.PID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/products_instock/:PID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PInStock } = req.body;
      const { PID } = req.params;
      const updatedProduct = await prisma.product.update({
        where: {
          PID: Number(PID),
        },
        data: {
          PInStock: Number(PInStock),
        },
      });
      res.status(200).json({
        updatedProduct,
        message: `Updated product instock with PID: ${updatedProduct.PID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/products/:PID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PID } = req.params;
      const deletedProduct = await prisma.product.delete({
        where: {
          PID: Number(PID),
        },
      });
      res.status(200).json({
        deletedProduct,
        message: `Deleted product with PID: ${deletedProduct.PID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

// Unit

app.post(
  "/units",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { UDetail } = req.body;
      const createdUnit = await prisma.unit.create({
        data: {
          UDetail,
        },
      });
      res.json({
        createdUnit,
        message: `Created unit with UID: ${createdUnit.UID}, successfully`,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

app.get(
  "/units",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const units = await prisma.unit.findMany();
      res.status(200).json(units);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/units/:UID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { UID } = req.params;
      const unit = await prisma.unit.findUnique({
        where: {
          UID: Number(UID),
        },
      });
      res.status(200).json(unit);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/units/:UID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { UDetail } = req.body;
      const { UID } = req.params;
      const updatedUnit = await prisma.unit.update({
        where: {
          UID: Number(UID),
        },
        data: {
          UDetail,
        },
      });
      res.status(200).json({
        updatedUnit,
        message: `Updated unit with UID: ${updatedUnit.UID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/units/:UID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { UID } = req.params;
      const deletedUnit = await prisma.unit.delete({
        where: {
          UID: Number(UID),
        },
      });
      res.status(200).json({
        deletedUnit,
        message: `Deleted unit with UID: ${deletedUnit.UID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

// Invoice

app.post(
  "/invoices",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const createdInvoice = await prisma.invoice.create({
        data: req.body,
      });
      res.status(200).json({
        createdInvoice,
        message: `Created invoice with IID: ${createdInvoice.IID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/invoices",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const invoices = await prisma.invoice.findMany();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/invoices/:IID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params;
      const invoice = await prisma.invoice.findUnique({
        where: {
          IID: Number(IID),
        },
      });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/invoices/:IID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params;
      const { IStatus, IDate, EmpID, CID } = req.body;
      const updatedInvoice = await prisma.invoice.update({
        where: {
          IID: Number(IID),
        },
        data: {
          IStatus,
          IDate,
          EmpID,
          CID,
        },
      });
      res.status(200).json({
        updatedInvoice,
        message: `IDated invoice with IID: ${updatedInvoice.IID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/invoices/:IID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params;
      const deletedInvoice = await prisma.invoice.delete({
        where: {
          IID: Number(IID),
        },
      });
      res.status(200).json({
        deletedInvoice,
        message: `Deleted invoice with IID: ${deletedInvoice.IID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

// InvoiceDetail

app.post(
  "/invoiceDetails",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const createdInvoiceDetail = await prisma.invoice_detail.create({
        data: req.body,
      });
      res.status(200).json({
        createdInvoiceDetail,
        message: `Created invoiceDetail with invoice IID: ${createdInvoiceDetail.IID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/invoiceDetails",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceDetail = await prisma.invoice_detail.findMany();
      res.status(200).json(invoiceDetail);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/invoiceDetails/:INVID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { INVID } = req.params;
      const invoiceDetail = await prisma.invoice_detail.findUnique({
        where: {
          INVID: Number(INVID),
        },
      });
      res.status(200).json(invoiceDetail);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/invoiceDetails/invoice/:IID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params;
      const invoiceDetail = await prisma.invoice_detail.findMany({
        where: {
          IID: Number(IID),
        },
      });
      res.status(200).json(invoiceDetail);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.put(
  "/invoiceDetails/:INVID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { INVID } = req.params;
      const updatedInvoiceDetail = await prisma.invoice_detail.update({
        where: {
          INVID: Number(INVID),
        },
        data: req.body,
      });
      res.status(200).json({
        updatedInvoiceDetail,
        message: `Updated invoiceDetail with invoice IID: ${updatedInvoiceDetail.IID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/invoiceDetails/:INVID",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { INVID } = req.params;
      const deletedInvoiceDetail = await prisma.invoice_detail.delete({
        where: {
          INVID: Number(INVID),
        },
      });
      res.status(200).json({
        deletedInvoiceDetail,
        message: `Deleted invoiceDetail with invoice IID: ${deletedInvoiceDetail.IID}, successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.get(
  "/report_product",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const report_product = await prisma.invoice_detail.groupBy({
        by: ["PID"],
        _sum: {
          INVQty: true,
        },
      });
      res.status(200).json(report_product);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.listen(8080, () => console.log(`Server ready at: http://localhost:8080`));
