// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "HR Companion" },
        { name: "HR Recruitment & Onboarding" },
        { name: "Employee Information" },
        { name: "Leave Management" },
        { name: "Payroll Management" },
        { name: "Performance Management" },
        { name: "Training and Development" },
        { name: "Employee Self-Service" },
        { name: "Benefits Administration" },
        { name: "Offboarding" },
      ],
    });
  } catch (error) {
    console.error("Error seeding database", error);
  } finally {
    await db.$disconnect();
  }
};

main();
