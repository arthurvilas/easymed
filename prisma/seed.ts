import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allergyData: Prisma.AllergyCreateInput[] = [
  {
    name: 'Dipirona',
  },
  {
    name: 'Penicilina',
  },
  {
    name: 'Poeira',
  },
];

const medicineData: Prisma.MedicineCreateInput[] = [
  {
    name: 'Azitromicina',
  },
  {
    name: 'Diclofenaco',
  },
  {
    name: 'Aspirina',
  },
];

const doctorData: Prisma.DoctorCreateInput[] = [
  {
    name: 'João Batista',
    email: 'joao@batista.com',
    password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca',
    profilePicture: 'www.images.com/doctor.png',
    description: 'Médico neurologista com 10 anos de experiência',
    specialty: {
      create: {
        name: 'Neurologia',
      },
    },
    insurance: 'HAPVIDA',
  },
  {
    name: 'Maria Fernandes',
    email: 'maria@fernandes.com',
    password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3',
    profilePicture: 'www.images.com/doctor.png',
    description: 'Médica gastroenterologista',
    specialty: {
      create: {
        name: 'Gastroenterologia',
      },
    },
    insurance: 'BRADESCO',
  },
];

const patientData: Prisma.PatientCreateInput[] = [
  {
    name: 'Cleiton Jones',
    cpf: '09898989898',
    email: 'cleiton@jones.com',
    password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca',
    birthDate: new Date('1999-01-01'),
    profilePicture: 'www.images.com/banana.png',
    height: 1.7,
    weight: 76,
    gender: 'masculino',
  },
  {
    name: 'Juliane Jin',
    cpf: '87612264487',
    email: 'juliane@jin.com',
    password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca',
    birthDate: new Date('2000-01-01'),
    profilePicture: 'www.images.com/banana.png',
    height: 1.5,
    weight: 66,
    gender: 'feminino',
  },
];

async function seed() {
  await prisma.patientAllergy.deleteMany();
  await prisma.patientMedicine.deleteMany();
  await prisma.allergy.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  console.log('Seeding started...');

  await prisma.allergy.createMany({ data: allergyData });
  await prisma.medicine.createMany({ data: medicineData });

  for (const patient of patientData) {
    await prisma.patient.create({ data: patient });
  }

  const patients = await prisma.patient.findMany();

  const allergies = await prisma.allergy.findMany();

  if (patients.length && allergies.length) {
    await prisma.patientAllergy.createMany({
      data: [
        {
          patientId: patients[0].id,
          allergyId: allergies[0].id,
          symptons: 'Inchaço na pele',
        },
        {
          patientId: patients[0].id,
          allergyId: allergies[2].id,
          symptons: 'Bloqueio de vias respiratórias',
        },
        {
          patientId: patients[1].id,
          allergyId: allergies[1].id,
          symptons: 'Coceira pelo corpo',
        },
      ],
    });
  }

  for (const doctor of doctorData) {
    await prisma.doctor.create({ data: doctor });
  }
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
