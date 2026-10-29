/**
 * Curated Spider-Verse Demo Dataset
 * 
 * Used for development, testing, and offline previews.
 * In production (when siteConfig.showDemoData is false), this dataset is omitted.
 * 
 * Includes:
 * - A response with multiple pictures (3 pictures)
 * - A response with a single picture (1 picture)
 * - A response with zero pictures (text-only)
 * - A response with multiple pictures (2 pictures)
 */

export const DEMO_RESPONSES = [
  {
    id: "response-001",
    messageTo: "Miles",
    messageBy: "Gwen Stacy",
    message: "Happy Birthday to the one and only Spider-Man of Earth-1610! No matter which dimension you find yourself swinging through, never forget what makes you truly special. Keep leaping off those rooftops with style. Proud of you always!",
    pictures: [
      {
        id: "response-001-pic-1",
        url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80",
        alt: "Birthday memory 1",
      },
      {
        id: "response-001-pic-2",
        url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
        alt: "Birthday memory 2",
      },
      {
        id: "response-001-pic-3",
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
        alt: "Birthday memory 3",
      },
    ],
    timestamp: "2026-10-20T10:15:00Z",
  },
  {
    id: "response-002",
    messageTo: "Birthday Hero",
    messageBy: "Peter B. Parker",
    message: "Happy Birthday kid! Remember: you can't think about saving the world until you've had a slice of birthday pizza and taken a deep breath. You're doing great. Keep your chin up and don't forget to stretch before a web swing.",
    pictures: [
      {
        id: "response-002-pic-1",
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
        alt: "Birthday memory 1",
      },
    ],
    timestamp: "2026-10-21T14:30:00Z",
  },
  {
    id: "response-003",
    messageTo: "Miles Morales",
    messageBy: "Pavitr Prabhakar",
    message: "HAPPY BIRTHDAY MY FRIEND! Being a hero in Mumbattan is intense, but celebrating someone as incredible as you is pure joy! Chai tea (and don't you dare just call it 'tea tea'!) is on me next time you swing through dimension 50101. Have the most legendary year ahead!",
    pictures: [], // Intentionally zero pictures to test graceful text-only layout
    timestamp: "2026-10-22T08:00:00Z",
  },
  {
    id: "response-004",
    messageTo: "The Web Warrior",
    messageBy: "Hobbie Brown",
    message: "Happy Birthday, mate. Don't let society tell you what consistency looks like. Keep breaking the mold, make your own soundtrack, and never follow the rules just because someone drew the lines. Rock on.",
    pictures: [
      {
        id: "response-004-pic-1",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        alt: "Birthday memory 1",
      },
      {
        id: "response-004-pic-2",
        url: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
        alt: "Birthday memory 2",
      },
    ],
    timestamp: "2026-10-23T19:45:00Z",
  },
];
