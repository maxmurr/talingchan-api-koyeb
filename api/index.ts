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
        message: `Created customer with id: ${createdCustomer.CID}, successfully`
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
        include: { invoices: true }
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
  "/customers/:id",
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

app.put(
  "/customers/:id",
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
      })
      res.status(200).json({
        updatedCustomer,
        message: `Updated customer with id: ${updatedCustomer.CID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/customers/:id",
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
        message: `Deleted customer with id: ${deletedCustomer.CID}, successfully`
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
          EmpPassword
        },
      });
      res.json({
        createdEmployee,
        message: `Created employee with id: ${createdEmployee.EmpID}, successfully`
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
  "/employees/:id",
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
  "/employees/:id",
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
          EmpPassword
        },
      });
      res.status(200).json({
        updatedEmployee,
        message: `Updated employee with id: ${updatedEmployee.EmpID}, successfully`
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/employees/:id",
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
        message: `Deleted employee with id: ${deletedEmployee.EmpID}, successfully`
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
      const { PName, PPrice, PDescription, PPicture } = req.body;
      const createdProduct = await prisma.product.create({
        data: {
          PName,
          PPrice,
          PPicture,
          PDescription,
        },
      });
      res.json({
        createdProduct,
        message: `Created product with id: ${createdProduct.PID}, successfully`
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
  "/products/:id",
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
  "/products/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { PName, PPrice, PPicture, PDescription } = req.body;
      const { PID } = req.params;
      const updatedProduct = await prisma.product.update({
        where: {
          PID: Number(PID),
        },
        data: {
          PName,
          PPrice,
        },
      });
      res.status(200).json({
        updatedProduct,
        message: `Updated product with id: ${updatedProduct.PID}, successfully`
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/products/:id",
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
        message: `Deleted product with id: ${deletedProduct.PID}, successfully`
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
        message: `Created unit with id: ${createdUnit.UID}, successfully`
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
  "/units/:id",
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
  "/units/:id",
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
        message: `Updated unit with id: ${updatedUnit.UID}, successfully`
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

app.delete(
  "/units/:id",
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
        message: `Deleted unit with id: ${deletedUnit.UID}, successfully`
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
      })
      res.status(200).json({
        createdInvoice,
        message: `Created invoice with id: ${createdInvoice.IID}, successfully`
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
)

app.get(
  "/invoices",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const invoices = await prisma.invoice.findMany();
      res.status(200).json(invoices)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/invoices/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params
      const invoice = await prisma.invoice.findUnique({
        where: {
          IID: Number(IID)
        }
      });
      res.status(200).json(invoice)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.put(
  "/invoices/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params
      const { IStatus, IDate, CID, EmpID } = req.body
      const updatedInvoice = await prisma.invoice.update({
        where: {
          IID: Number(IID),
        },
        data: {
          IStatus,
          IDate,
          CID,
          EmpID
        }
      })
      res.status(200).json({
        updatedInvoice,
        message: `Updated invoice with id: ${updatedInvoice.IID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.delete(
  "/invoices/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params
      const deletedInvoice = await prisma.invoice.delete({
        where: {
          IID: Number(IID),
        }
      })
      res.status(200).json({
        deletedInvoice,
        message: `Deleted invoice with id: ${deletedInvoice.IID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

// Lot

app.post(
  "/lots",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const createdLot = await prisma.lot.create({
        data: req.body
      })
      res.status(200).json({
        createdLot,
        message: `Created lot with id: ${createdLot.LotID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/lots",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const lots = await prisma.lot.findMany()
      res.status(200).json(lots)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/lots/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { LotID } = req.params
      const lot = await prisma.lot.findUnique({
        where: {
          LotID: Number(LotID)
        }
      })
      res.status(200).json(lot)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.put(
  "/lots/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { LotID } = req.params
      const updatedLot = await prisma.lot.update({
        where: {
          LotID: Number(LotID)
        },
        data: req.body
      })
      res.status(200).json({
        updatedLot,
        message: `Updated lot with id: ${updatedLot.LotID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.delete(
  "/lots/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { LotID } = req.params
      const deletedLot = await prisma.lot.delete({
        where: {
          LotID: Number(LotID)
        }
      })
      res.status(200).json({
        deletedLot,
        message: `Deleted lot with id: ${deletedLot.LotID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

// InvoiceDetail

app.post(
  "/invoice_details",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const createdInvoiceDetail = await prisma.invoice_detail.create({
        data: req.body
      })
      res.status(200).json({
        createdInvoiceDetail,
        message: `Created invoiceDetail with invoice id: ${createdInvoiceDetail.IID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/invoice_details",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceDetail = await prisma.invoice_detail.findMany()
      res.status(200).json(invoiceDetail)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/invoice_details/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params
      const invoiceDetail = await prisma.invoice_detail.findUnique({
        where: {
          IID: Number(IID)
        }
      })
      res.status(200).json(invoiceDetail)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.put(
  "/invoice_details/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params
      const updatedInvoiceDetail = await prisma.invoice_detail.update({
        where: {
          IID: Number(IID),
        },
        data: req.body
      })
      res.status(200).json({
        updatedInvoiceDetail,
        message: `Updated invoiceDetail with invoice id: ${updatedInvoiceDetail.IID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.delete(
  "/invoice_details/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { IID } = req.params
      const deletedInvoiceDetail = await prisma.invoice_detail.delete({
        where: {
          IID: Number(IID),
        }
      })
      res.status(200).json({
        deletedInvoiceDetail,
        message: `Deleted invoiceDetail with invoice id: ${deletedInvoiceDetail.IID}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)



app.listen(8080, () => console.log(`Server ready at: http://localhost:8080`));
