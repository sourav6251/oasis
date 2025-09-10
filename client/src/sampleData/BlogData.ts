export interface BlogData {
    id: number;
    image: string;
    writer: string;
    publishDate: string;
    title: string;
    content: string;
}

export const blogData: BlogData[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        writer: "Sophia Lee",
        publishDate: "2024-05-10",
        title: "5 Essential Skincare Tips for Glowing Skin",
        content:
            "Achieving glowing skin starts with a consistent skincare routine. Cleanse your face twice daily, use a gentle exfoliator, moisturize regularly, apply sunscreen, and stay hydrated. Remember, healthy skin is a reflection of overall wellness.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        writer: "Maya Patel",
        publishDate: "2024-04-22",
        title: "Natural Makeup Looks for Everyday Beauty",
        content:
            "Embrace your natural beauty with minimal makeup. Use a tinted moisturizer, a touch of blush, and a swipe of mascara for a fresh look. Highlight your features with a nude lip and subtle highlighter for a radiant finish.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
        writer: "Emily Chen",
        publishDate: "2024-03-15",
        title: "Hair Care Routine for Healthy, Shiny Hair",
        content:
            "Keep your hair healthy by washing it with sulfate-free shampoo, conditioning regularly, and avoiding excessive heat styling. Use a wide-tooth comb to detangle and apply hair oil to the ends for added shine and protection.",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
        writer: "Olivia Smith",
        publishDate: "2024-02-28",
        title: "DIY Face Masks for Every Skin Type",
        content:
            "Pamper your skin with homemade face masks. For dry skin, try honey and yogurt. Oily skin benefits from clay and tea tree oil. Sensitive skin loves oatmeal and aloe vera. Always patch test before applying to your face.",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        writer: "Liam Johnson",
        publishDate: "2024-01-12",
        title: "Top Beauty Tips for Busy Mornings",
        content:
            "Short on time? Use multi-purpose products like BB cream, cream blush, and tinted lip balm. Dry shampoo can refresh your hair instantly. Organize your beauty essentials for a quick and efficient morning routine.",
    },
];