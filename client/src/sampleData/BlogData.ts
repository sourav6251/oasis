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

export interface Review {
  name: string
  image: string
  rating: number
  text: string
  service: string
  date:string
}

export const reviews: Review[] = [
  {
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    rating: 5,
    text: "The bridal makeup was flawless and lasted the entire day. I felt so confident!",
    service: "Bridal Makeup",
    date: "2024-05-01",
  },
  {
    name: "Ananya Roy",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    rating: 4,
    text: "Loved the hair spa treatment. My hair feels soft and smooth again.",
    service: "Hair Spa",
    date: "2024-05-01",
  },
  {
    name: "Riya Patel",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    rating: 5,
    text: "Best facial experience! My skin is glowing and refreshed.",
    service: "Facial",
    date: "2024-05-01",
  },
  {
    name: "Sneha Kapoor",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    rating: 3,
    text: "Good service overall, but I had to wait a bit longer than expected.",
    service: "Pedicure",
    date: "2024-05-01",
  },
  {
    name: "Meera Iyer",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 5,
    text: "The manicure was perfect, and the staff was very friendly.",
    service: "Manicure",
    date: "2024-05-01",
  },
  {
    name: "Tanvi Verma",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    rating: 4,
    text: "The waxing service was quick and relatively painless. Very professional staff.",
    service: "Waxing",
    date: "2024-05-01",
  },
  {
    name: "Kavya Sen",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    rating: 5,
    text: "The spa package was so relaxing, I didn’t want it to end.",
    service: "Full Body Spa",
    date: "2024-05-01",
  },
  {
    name: "Shreya Nair",
    image: "https://randomuser.me/api/portraits/women/80.jpg",
    rating: 4,
    text: "The hairstylist understood exactly what I wanted. Love my new look!",
    service: "Hair Styling",
    date: "2024-05-01",
  },
  {
    name: "Nisha Gupta",
    image: "https://randomuser.me/api/portraits/women/81.jpg",
    rating: 5,
    text: "Got my nails done here and I am obsessed with the design!",
    service: "Nail Art",
    date: "2024-05-01",
  },
  {
    name: "Divya Rathi",
    image: "https://randomuser.me/api/portraits/women/82.jpg",
    rating: 4,
    text: "The facial massage was so soothing, I almost fell asleep.",
    service: "Facial",
    date: "2024-05-01",
  },
  {
    name: "Ishita Malhotra",
    image: "https://randomuser.me/api/portraits/women/83.jpg",
    rating: 5,
    text: "Absolutely amazing bridal package. Worth every penny!",
    service: "Bridal Package",
    date: "2024-05-01",
  },
  {
    name: "Sanya Mehta",
    image: "https://randomuser.me/api/portraits/women/84.jpg",
    rating: 2,
    text: "The service was okay, but I felt the staff was in a hurry.",
    service: "Hair Cut",
    date: "2024-05-01",
  },
  {
    name: "Radhika Bose",
    image: "https://randomuser.me/api/portraits/women/85.jpg",
    rating: 5,
    text: "Loved my makeover session. They completely transformed my look!",
    service: "Makeover",
    date: "2024-05-01",
  },
  {
    name: "Neha Joshi",
    image: "https://randomuser.me/api/portraits/women/86.jpg",
    rating: 4,
    text: "The hair coloring turned out great. Exactly the shade I wanted.",
    service: "Hair Coloring",
    date: "2024-05-01",
  },
  {
    name: "Ayesha Khan",
    image: "https://randomuser.me/api/portraits/women/87.jpg",
    rating: 5,
    text: "Such a peaceful spa experience. Perfect for stress relief.",
    service: "Aromatherapy Spa",
    date: "2024-05-01",
  },
  {
    name: "Pooja Reddy",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
    rating: 3,
    text: "The manicure was fine but could have been more detailed.",
    service: "Manicure",
    date: "2024-05-01",
  },
  {
    name: "Simran Kaur",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    rating: 5,
    text: "My bridal mehndi was stunning and received so many compliments.",
    service: "Mehndi",
    date: "2024-05-01",
  },
  {
    name: "Aditi Mishra",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 4,
    text: "The hair treatment has improved my hair texture a lot.",
    service: "Keratin Treatment",
    date: "2024-05-01",
  },
  {
    name: "Sonali Chatterjee",
    image: "https://randomuser.me/api/portraits/women/91.jpg",
    rating: 5,
    text: "They did my party makeup beautifully. Highly recommended.",
    service: "Party Makeup",
    date: "2024-05-01",
  },
  {
    name: "Monica Das",
    image: "https://randomuser.me/api/portraits/women/92.jpg",
    rating: 4,
    text: "Great ambiance and polite staff. Definitely coming back.",
    service: "Facial",
    date: "2024-05-01",
  },
]
