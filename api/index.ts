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
      const { name, tel } = req.body;
      const createdCustomer = await prisma.customer.create({
        data: {
          name,
          tel,
        },
      });
      res.json({
        createdCustomer,
        message: `Created customer with id: ${createdCustomer.id}, successfully`
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
      const { id } = req.params;
      const customer = await prisma.customer.findUnique({
        where: {
          id: Number(id),
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
      const { name, tel } = req.body;
      const { id } = req.params;
      const updatedCustomer = await prisma.customer.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          tel,
        },
      })
      res.status(200).json({
        updatedCustomer,
        message: `Updated customer with id: ${updatedCustomer.id}, successfully`
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
      const { id } = req.params;
      const deletedCustomer = await prisma.customer.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({
        deletedCustomer,
        message: `Deleted customer with id: ${deletedCustomer.id}, successfully`
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
      const { name, position, tel } = req.body;
      const createdEmployee = await prisma.employee.create({
        data: {
          name,
          position,
          tel,
        },
      });
      res.json({
        createdEmployee,
        message: `Created employee with id: ${createdEmployee.id}, successfully`
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
      const { id } = req.params;
      const employee = await prisma.employee.findUnique({
        where: {
          id: Number(id),
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
      const { name, position, tel } = req.body;
      const { id } = req.params;
      const updatedEmployee = await prisma.employee.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          position,
          tel,
        },
      });
      res.status(200).json({
        updatedEmployee,
        message: `Updated employee with id: ${updatedEmployee.id}, successfully`
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
      const { id } = req.params;
      const deletedEmployee = await prisma.employee.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({
        deletedEmployee,
        message: `Deleted employee with id: ${deletedEmployee.id}, successfully`
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
      const { name, price, description, picture } = req.body;
      const createdProduct = await prisma.product.create({
        data: {
          name,
          price,
          picture,
          description,
        },
      });
      res.json({
        createdProduct,
        message: `Created product with id: ${createdProduct.id}, successfully`
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
      res.status(200).json({products});
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
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: {
          id: Number(id),
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
      const { name, price } = req.body;
      const { id } = req.params;
      const updatedProduct = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          price,
        },
      });
      res.status(200).json({
        updatedProduct,
        message: `Updated product with id: ${updatedProduct.id}, successfully`
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
      const { id } = req.params;
      const deletedProduct = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({
        deletedProduct,
        message: `Deleted product with id: ${deletedProduct.id}, successfully`
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
      const { detail } = req.body;
      const createdUnit = await prisma.unit.create({
        data: {
          detail,
        },
      });
      res.json({
        createdUnit,
        message: `Created unit with id: ${createdUnit.id}, successfully`
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
      const { id } = req.params;
      const unit = await prisma.unit.findUnique({
        where: {
          id: Number(id),
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
      const { detail } = req.body;
      const { id } = req.params;
      const updatedUnit = await prisma.unit.update({
        where: {
          id: Number(id),
        },
        data: {
          detail,
        },
      });
      res.status(200).json({
        updatedUnit,
        message: `Updated unit with id: ${updatedUnit.id}, successfully`
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
      const { id } = req.params;
      const deletedUnit = await prisma.unit.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({
        deletedUnit,
        message: `Deleted unit with id: ${deletedUnit.id}, successfully`
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
        message: `Created invoice with id: ${createdInvoice.id}, successfully`
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
      const { id } = req.params
      const invoice = await prisma.invoice.findUnique({
        where: {
          id: Number(id)
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
      const { id } = req.params
      const { status, customerId, employeeId } = req.body
      const updatedInvoice = await prisma.invoice.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
          customerId,
          employeeId
        }
      })
      res.status(200).json({
        updatedInvoice,
        message: `Updated invoice with id: ${updatedInvoice.id}, successfully`
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
      const { id } = req.params
      const deletedInvoice = await prisma.invoice.delete({
        where: {
          id: Number(id),
        }
      })
      res.status(200).json({
        deletedInvoice,
        message: `Deleted invoice with id: ${deletedInvoice.id}, successfully`
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
        message: `Created lot with id: ${createdLot.id}, successfully`
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
      const { id } = req.params
      const lot = await prisma.lot.findUnique({
        where: {
          id: Number(id)
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
      const { id } = req.params
      const updatedLot = await prisma.lot.update({
        where: {
          id: Number(id)
        },
        data: req.body
      })
      res.status(200).json({
        updatedLot,
        message: `Updated lot with id: ${updatedLot.id}, successfully`
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
      const { id } = req.params
      const deletedLot = await prisma.lot.delete({
        where: {
          id: Number(id)
        }
      })
      res.status(200).json({
        deletedLot,
        message: `Deleted lot with id: ${deletedLot.id}, successfully`
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
  "/invoiceDetail",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const createdInvoiceDetail = await prisma.invoiceDetail.create({
        data: req.body
      })
      res.status(200).json({
        createdInvoiceDetail,
        message: `Created invoiceDetail with id: ${createdInvoiceDetail.id}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/invoiceDetail",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const invoiceDetail = await prisma.invoiceDetail.findMany()
      res.status(200).json(invoiceDetail)
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.get(
  "/invoiceDetail/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const invoiceDetail = await prisma.invoiceDetail.findUnique({
        where: {
          id: Number(id)
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
  "/invoiceDetail/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const updatedInvoiceDetail = await prisma.invoiceDetail.update({
        where: {
          id: Number(id),
        },
        data: req.body
      })
      res.status(200).json({
        updatedInvoiceDetail,
        message: `Updated invoiceDetail with id: ${updatedInvoiceDetail.id}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)

app.delete(
  "/invoiceDetail/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const deletedInvoiceDetail = await prisma.invoiceDetail.delete({
        where: {
          id: Number(id),
        }
      })
      res.status(200).json({
        deletedInvoiceDetail,
        message: `Deleted invoiceDetail with id: ${deletedInvoiceDetail.id}, successfully`
      })
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)



app.listen(8080, () => console.log(`Server ready at: http://localhost:8080`));
