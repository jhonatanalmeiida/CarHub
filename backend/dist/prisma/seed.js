import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const catalog = [
    {
        brand: { name: "Toyota", country: "Japao", logoUrl: "https://cdn.simpleicons.org/toyota" },
        model: { name: "Corolla", category: "Sedan", yearStart: 1966, yearEnd: null },
        vehicles: [
            {
                trim: "XEi",
                year: 2024,
                price: 158990,
                fuelType: "Flex",
                transmission: "CVT",
                bodyType: "Sedan",
                horsepower: 177,
                torque: 21,
                engine: "2.0 Dynamic Force",
                consumptionCity: 10.8,
                consumptionHighway: 13.2,
                doors: 4,
                trunkCapacity: 470,
                color: "Cinza Aco",
                imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
                description: "Sedan medio com foco em conforto, confiabilidade e acabamento refinado."
            },
            {
                trim: "Altis Hybrid Premium",
                year: 2024,
                price: 199990,
                fuelType: "Hibrido",
                transmission: "CVT",
                bodyType: "Sedan",
                horsepower: 122,
                torque: 16,
                engine: "1.8 Hybrid Flex",
                consumptionCity: 17.5,
                consumptionHighway: 15.2,
                doors: 4,
                trunkCapacity: 470,
                color: "Branco Lunar",
                imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d",
                description: "Configuracao mais eficiente do Corolla, com foco em economia, silencio e pacote ADAS."
            }
        ]
    },
    {
        brand: { name: "Honda", country: "Japao", logoUrl: "https://cdn.simpleicons.org/honda" },
        model: { name: "Civic", category: "Sedan", yearStart: 1972, yearEnd: null },
        vehicles: [
            {
                trim: "EXL",
                year: 2024,
                price: 176900,
                fuelType: "Gasolina",
                transmission: "CVT",
                bodyType: "Sedan",
                horsepower: 126,
                torque: 15,
                engine: "2.0 i-VTEC",
                consumptionCity: 10.5,
                consumptionHighway: 13.3,
                doors: 4,
                trunkCapacity: 495,
                color: "Cinza Basalto",
                imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d",
                description: "Versao equilibrada com boa ergonomia, pacote de seguranca e desenho elegante."
            },
            {
                trim: "Touring",
                year: 2024,
                price: 189900,
                fuelType: "Gasolina",
                transmission: "CVT",
                bodyType: "Sedan",
                horsepower: 180,
                torque: 24,
                engine: "1.5 Turbo",
                consumptionCity: 11.2,
                consumptionHighway: 14.5,
                doors: 4,
                trunkCapacity: 495,
                color: "Branco",
                imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
                description: "Sedan com pegada esportiva, tecnologia de bordo e ergonomia premium."
            }
        ]
    },
    {
        brand: { name: "Volkswagen", country: "Alemanha", logoUrl: "https://cdn.simpleicons.org/volkswagen" },
        model: { name: "Polo", category: "Hatch", yearStart: 1975, yearEnd: null },
        vehicles: [
            {
                trim: "TSI",
                year: 2024,
                price: 101990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "Hatch",
                horsepower: 116,
                torque: 16,
                engine: "1.0 TSI",
                consumptionCity: 11.8,
                consumptionHighway: 14.1,
                doors: 4,
                trunkCapacity: 300,
                color: "Prata Sirius",
                imageUrl: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
                description: "Hatch urbano com dinamica afiada, bom consumo e conectividade intuitiva."
            },
            {
                trim: "Highline",
                year: 2024,
                price: 118990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "Hatch",
                horsepower: 116,
                torque: 16,
                engine: "1.0 TSI",
                consumptionCity: 11.3,
                consumptionHighway: 13.9,
                doors: 4,
                trunkCapacity: 300,
                color: "Vermelho Sunset",
                imageUrl: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
                description: "A versao mais completa do Polo, com visual refinado e recursos extras de seguranca."
            }
        ]
    },
    {
        brand: { name: "Hyundai", country: "Coreia do Sul", logoUrl: "https://cdn.simpleicons.org/hyundai" },
        model: { name: "Creta", category: "SUV", yearStart: 2014, yearEnd: null },
        vehicles: [
            {
                trim: "Comfort",
                year: 2024,
                price: 139990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "SUV",
                horsepower: 120,
                torque: 17,
                engine: "1.0 TGDI",
                consumptionCity: 11.6,
                consumptionHighway: 13.8,
                doors: 4,
                trunkCapacity: 422,
                color: "Cinza Silk",
                imageUrl: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a",
                description: "SUV compacto com cabine bem resolvida, boa altura livre e pacote racional."
            },
            {
                trim: "Platinum",
                year: 2024,
                price: 168990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "SUV",
                horsepower: 193,
                torque: 27,
                engine: "1.6 TGDI",
                consumptionCity: 10.1,
                consumptionHighway: 12.4,
                doors: 4,
                trunkCapacity: 422,
                color: "Azul Safira",
                imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
                description: "Configuracao topo com desempenho forte, multimidia moderna e acabamento premium."
            }
        ]
    },
    {
        brand: { name: "Chevrolet", country: "Estados Unidos", logoUrl: "https://cdn.simpleicons.org/chevrolet" },
        model: { name: "Onix", category: "Hatch", yearStart: 2012, yearEnd: null },
        vehicles: [
            {
                trim: "LT Turbo",
                year: 2024,
                price: 96990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "Hatch",
                horsepower: 116,
                torque: 16,
                engine: "1.0 Turbo",
                consumptionCity: 11.7,
                consumptionHighway: 14.8,
                doors: 4,
                trunkCapacity: 275,
                color: "Branco Summit",
                imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b",
                description: "Compacto equilibrado para cidade, com bom consumo e lista de equipamentos consistente."
            },
            {
                trim: "Premier Turbo",
                year: 2024,
                price: 113990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "Hatch",
                horsepower: 116,
                torque: 16,
                engine: "1.0 Turbo",
                consumptionCity: 11.3,
                consumptionHighway: 14.3,
                doors: 4,
                trunkCapacity: 275,
                color: "Preto Ouro Negro",
                imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
                description: "Versao mais sofisticada do Onix, com cockpit digital e sensacao mais premium."
            }
        ]
    },
    {
        brand: { name: "Ford", country: "Estados Unidos", logoUrl: "https://cdn.simpleicons.org/ford" },
        model: { name: "Territory", category: "SUV", yearStart: 2018, yearEnd: null },
        vehicles: [
            {
                trim: "SEL",
                year: 2024,
                price: 209990,
                fuelType: "Gasolina",
                transmission: "Automatica",
                bodyType: "SUV",
                horsepower: 169,
                torque: 25,
                engine: "1.5 EcoBoost",
                consumptionCity: 9.8,
                consumptionHighway: 11.5,
                doors: 4,
                trunkCapacity: 448,
                color: "Cinza Dover",
                imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
                description: "SUV familiar com muito espaco interno, foco em conforto e painel de leitura rapida."
            },
            {
                trim: "Titanium",
                year: 2024,
                price: 229990,
                fuelType: "Gasolina",
                transmission: "Automatica",
                bodyType: "SUV",
                horsepower: 169,
                torque: 25,
                engine: "1.5 EcoBoost",
                consumptionCity: 9.5,
                consumptionHighway: 11.1,
                doors: 4,
                trunkCapacity: 448,
                color: "Azul Atlantico",
                imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935",
                description: "Pacote mais completo da Territory, com assistencias de conducao e cabine mais refinada."
            }
        ]
    },
    {
        brand: { name: "Nissan", country: "Japao", logoUrl: "https://cdn.simpleicons.org/nissan" },
        model: { name: "Kicks", category: "SUV", yearStart: 2016, yearEnd: null },
        vehicles: [
            {
                trim: "Sense",
                year: 2024,
                price: 112990,
                fuelType: "Flex",
                transmission: "CVT",
                bodyType: "SUV",
                horsepower: 113,
                torque: 15,
                engine: "1.6 Flex",
                consumptionCity: 11.4,
                consumptionHighway: 13.7,
                doors: 4,
                trunkCapacity: 432,
                color: "Cinza Grafite",
                imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
                description: "SUV leve e pratico para o dia a dia, com boa visibilidade e custo de uso equilibrado."
            },
            {
                trim: "Advance Plus",
                year: 2024,
                price: 139990,
                fuelType: "Flex",
                transmission: "CVT",
                bodyType: "SUV",
                horsepower: 113,
                torque: 15,
                engine: "1.6 Flex",
                consumptionCity: 11.1,
                consumptionHighway: 13.4,
                doors: 4,
                trunkCapacity: 432,
                color: "Vermelho Malbec",
                imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
                description: "Versao mais equipada do Kicks, ideal para quem quer mais tecnologia e acabamento."
            }
        ]
    },
    {
        brand: { name: "Jeep", country: "Estados Unidos", logoUrl: "https://cdn.simpleicons.org/jeep" },
        model: { name: "Compass", category: "SUV", yearStart: 2006, yearEnd: null },
        vehicles: [
            {
                trim: "Longitude",
                year: 2024,
                price: 192990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "SUV",
                horsepower: 185,
                torque: 27,
                engine: "1.3 Turbo T270",
                consumptionCity: 9.1,
                consumptionHighway: 11.4,
                doors: 4,
                trunkCapacity: 476,
                color: "Azul Profundo",
                imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
                description: "SUV medio com visual robusto, pacote tecnologico e aptidao urbana."
            },
            {
                trim: "Overland",
                year: 2024,
                price: 238990,
                fuelType: "Flex",
                transmission: "Automatica",
                bodyType: "SUV",
                horsepower: 185,
                torque: 27,
                engine: "1.3 Turbo T270",
                consumptionCity: 8.7,
                consumptionHighway: 10.9,
                doors: 4,
                trunkCapacity: 476,
                color: "Preto Carbon",
                imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
                description: "Compass com pegada mais sofisticada, bancos premium e recursos extras de assistencia."
            }
        ]
    },
    {
        brand: { name: "BMW", country: "Alemanha", logoUrl: "https://cdn.simpleicons.org/bmw" },
        model: { name: "Serie 3", category: "Sedan", yearStart: 1975, yearEnd: null },
        vehicles: [
            {
                trim: "320i GP",
                year: 2024,
                price: 309950,
                fuelType: "Gasolina",
                transmission: "Automatica",
                bodyType: "Sedan",
                horsepower: 184,
                torque: 30,
                engine: "2.0 TwinPower Turbo",
                consumptionCity: 10.2,
                consumptionHighway: 13.1,
                doors: 4,
                trunkCapacity: 480,
                color: "Branco Alpino",
                imageUrl: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b",
                description: "Esportivo executivo com equilibrio entre refinamento, tracao traseira e conectividade."
            },
            {
                trim: "320i M Sport",
                year: 2024,
                price: 349950,
                fuelType: "Gasolina",
                transmission: "Automatica",
                bodyType: "Sedan",
                horsepower: 184,
                torque: 30,
                engine: "2.0 TwinPower Turbo",
                consumptionCity: 9.8,
                consumptionHighway: 12.7,
                doors: 4,
                trunkCapacity: 480,
                color: "Azul Portimao",
                imageUrl: "https://images.unsplash.com/photo-1502877828070-33da8ee39ef8",
                description: "Pacote com visual mais agressivo, acerto dinamico mais esportivo e cabine ainda mais envolvente."
            }
        ]
    },
    {
        brand: { name: "Audi", country: "Alemanha", logoUrl: "https://cdn.simpleicons.org/audi" },
        model: { name: "A3", category: "Sedan", yearStart: 1996, yearEnd: null },
        vehicles: [
            {
                trim: "Prestige Plus",
                year: 2024,
                price: 289990,
                fuelType: "Gasolina",
                transmission: "Automatica",
                bodyType: "Sedan",
                horsepower: 204,
                torque: 32,
                engine: "2.0 TFSI",
                consumptionCity: 10.7,
                consumptionHighway: 13.5,
                doors: 4,
                trunkCapacity: 425,
                color: "Cinza Daytona",
                imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f",
                description: "Sedan premium com cockpit tecnologico, rodar refinado e linguagem visual precisa."
            },
            {
                trim: "Performance Black",
                year: 2024,
                price: 319990,
                fuelType: "Gasolina",
                transmission: "Automatica",
                bodyType: "Sedan",
                horsepower: 204,
                torque: 32,
                engine: "2.0 TFSI",
                consumptionCity: 10.2,
                consumptionHighway: 13.1,
                doors: 4,
                trunkCapacity: 425,
                color: "Preto Mito",
                imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
                description: "Configuracao com acabamento escurecido, pacote estilistico esportivo e sensacao mais exclusiva."
            }
        ]
    }
];
async function main() {
    await prisma.comparisonItem.deleteMany();
    await prisma.comparison.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.carModel.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.user.deleteMany();
    const createdVehicles = [];
    for (const entry of catalog) {
        const brand = await prisma.brand.create({
            data: entry.brand
        });
        const model = await prisma.carModel.create({
            data: {
                ...entry.model,
                brandId: brand.id
            }
        });
        for (const vehicle of entry.vehicles) {
            const createdVehicle = await prisma.vehicle.create({
                data: {
                    ...vehicle,
                    modelId: model.id
                }
            });
            createdVehicles.push({ id: createdVehicle.id, trim: createdVehicle.trim });
        }
    }
    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const userPassword = await bcrypt.hash("User@123", 10);
    const [adminUser, demoUser] = await Promise.all([
        prisma.user.create({
            data: {
                name: "CarHub Admin",
                email: "admin@carhub.cloud",
                passwordHash: adminPassword,
                role: "ADMIN"
            }
        }),
        prisma.user.create({
            data: {
                name: "Demo Driver",
                email: "user@carhub.cloud",
                passwordHash: userPassword,
                role: "USER"
            }
        })
    ]);
    await prisma.favorite.createMany({
        data: createdVehicles.slice(0, 4).map((vehicle) => ({
            userId: demoUser.id,
            vehicleId: vehicle.id
        }))
    });
    const comparison = await prisma.comparison.create({
        data: {
            userId: demoUser.id
        }
    });
    await prisma.comparisonItem.createMany({
        data: createdVehicles.slice(0, 3).map((vehicle) => ({
            comparisonId: comparison.id,
            vehicleId: vehicle.id
        }))
    });
    console.log(`Seed concluido com ${catalog.length} marcas/modelos, ${createdVehicles.length} veiculos, 2 usuarios e favoritos/comparacao de demo.`);
    console.log(`Admin: ${adminUser.email} / Admin@123`);
    console.log(`Usuario: ${demoUser.email} / User@123`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
