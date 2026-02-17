export const flocks = [
    {
        id: 1,
        breed: "Broilers (Kuroiler)",
        arrivalDate: "12 Jan 2024",
        initialCount: 500,
        currentCount: 485,
        age: "4 Weeks",
        status: "Active",
        mortality: 3.0 // Percentage
    },
    {
        id: 2,
        breed: "Layers (Isa Brown)",
        arrivalDate: "05 Nov 2023",
        initialCount: 1000,
        currentCount: 980,
        age: "14 Weeks",
        status: "Active",
        mortality: 2.0
    }
];

export const healthLogs = [
    {
        id: 1,
        date: "Today, 10:00 AM",
        type: "Vaccination",
        detail: "Newcastle (Lasota)",
        flockId: 1,
        notes: "All birds vaccinated"
    },
    {
        id: 2,
        date: "Yesterday",
        type: "Mortality",
        detail: "2 Birds Died",
        flockId: 1,
        notes: "Sudden death, suspect heat stress"
    }
];

export const feedLogs = [
    {
        id: 1,
        date: "Today",
        type: "Consumption",
        item: "Growers Mash",
        quantity: "50kg",
        flockId: 1
    },
    {
        id: 2,
        date: "04 Feb 2024",
        type: "Purchase",
        item: "Layers Mash",
        quantity: "10 Bags",
        cost: "Tsh 850,000",
        supplier: "Unga Ltd"
    }
];

export const productionLogs = [
    {
        id: 1,
        date: "Today",
        type: "Egg Collection",
        quantity: "850 Eggs",
        crates: "28 Crates + 10",
        flockId: 2
    },
    {
        id: 2,
        date: "Yesterday",
        type: "Sales",
        item: "Sold 20 Crates",
        amount: "Tsh 240,000",
        buyer: "Mama Lishe"
    }
];

export const financeStats = {
    income: 2400000,
    expenses: 1200000,
    profit: 1200000,
    currency: "Tsh"
};

export const financeLogs = [
    {
        id: 1,
        date: "Today",
        category: "Sales",
        description: "Egg Sales (20 Crates)",
        amount: 240000,
        type: "income"
    },
    {
        id: 2,
        date: "Yesterday",
        category: "Feed",
        description: "Feed Purchase (Growers)",
        amount: 120000,
        type: "expense"
    }
];
