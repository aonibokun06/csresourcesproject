import { mutation } from "./_generated/server";

// Seed function to add sample data
export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingTopics = await ctx.db.query("topics").collect();
    if (existingTopics.length > 0) {
      return { success: false, message: "Data already exists. Skipping seed." };
    }

    // Add sample topics
    const webDevTopic = await ctx.db.insert("topics", {
      name: "Web Development",
      slug: "web-development",
      description: "Learn HTML, CSS, JavaScript, React, and modern web technologies. Build responsive websites and web applications.",
      icon: "CodeBracketIcon",
      color: "bg-blue-500",
      featured: true,
      order: 1,
    });

    const dsaTopic = await ctx.db.insert("topics", {
      name: "Data Structures & Algorithms",
      slug: "dsa",
      description: "Master fundamental algorithms and data structures. Essential for technical interviews and software engineering.",
      icon: "CpuChipIcon",
      color: "bg-green-500",
      featured: true,
      order: 2,
    });

    const aiMlTopic = await ctx.db.insert("topics", {
      name: "Machine Learning & AI",
      slug: "ai-ml",
      description: "Explore artificial intelligence and machine learning concepts. From basic algorithms to deep learning frameworks.",
      icon: "RocketLaunchIcon",
      color: "bg-purple-500",
      featured: true,
      order: 3,
    });

    const csFundamentalsTopic = await ctx.db.insert("topics", {
      name: "Computer Science Fundamentals",
      slug: "cs-fundamentals",
      description: "Core CS concepts, theory, and principles. Understanding the foundations of computing.",
      icon: "BookOpenIcon",
      color: "bg-orange-500",
      featured: true,
      order: 4,
    });

    const databasesTopic = await ctx.db.insert("topics", {
      name: "Databases & Data Management",
      slug: "databases",
      description: "Learn about SQL, NoSQL databases, data modeling, and database design principles.",
      icon: "ServerIcon",
      color: "bg-red-500",
      featured: false,
      order: 5,
    });

    const cloudTopic = await ctx.db.insert("topics", {
      name: "Cloud Computing",
      slug: "cloud-computing",
      description: "AWS, Azure, Google Cloud, and cloud-native development practices.",
      icon: "CloudIcon",
      color: "bg-indigo-500",
      featured: false,
      order: 6,
    });

    const cybersecurityTopic = await ctx.db.insert("topics", {
      name: "Cybersecurity",
      slug: "cybersecurity",
      description: "Network security, cryptography, ethical hacking, and security best practices.",
      icon: "ShieldCheckIcon",
      color: "bg-yellow-500",
      featured: false,
      order: 7,
    });

    const systemsTopic = await ctx.db.insert("topics", {
      name: "Systems Programming",
      slug: "systems-programming",
      description: "Operating systems, low-level programming, and system architecture.",
      icon: "CommandLineIcon",
      color: "bg-gray-500",
      featured: false,
      order: 8,
    });

    // EXAMPLE: How to add a new topic
    // const mobileDevTopic = await ctx.db.insert("topics", {
    //   name: "Mobile Development",
    //   slug: "mobile-development",
    //   description: "iOS, Android, React Native, and mobile app development.",
    //   icon: "DevicePhoneMobileIcon",
    //   color: "bg-pink-500",
    //   featured: false,
    //   order: 9,
    // });

    // EXAMPLE: How to add resources for the new topic
    // await ctx.db.insert("resources", {
    //   title: "React Native Tutorial",
    //   url: "https://reactnative.dev/docs/tutorial",
    //   description: "Official React Native tutorial for building mobile apps.",
    //   type: "course",
    //   topicId: mobileDevTopic,
    //   difficulty: "intermediate",
    //   tags: ["react-native", "mobile", "javascript", "ios", "android"],
    //   featured: true,
    //   approved: true,
    //   createdAt: Date.now(),
    // });

    // Add comprehensive resources for Web Development
    await ctx.db.insert("resources", {
      title: "React Tutorial for Beginners",
      url: "https://react.dev/learn",
      description: "Official React tutorial covering the basics of React components, state, and props.",
      type: "course",
      topicId: webDevTopic,
      difficulty: "beginner",
      tags: ["react", "javascript", "frontend", "tutorial"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "CSS Grid Layout Guide",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      description: "Comprehensive guide to CSS Grid Layout with examples and best practices.",
      type: "article",
      topicId: webDevTopic,
      difficulty: "intermediate",
      tags: ["css", "grid", "layout", "frontend"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "JavaScript: The Definitive Guide",
      url: "https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/",
      description: "Comprehensive book covering JavaScript fundamentals to advanced concepts.",
      type: "book",
      topicId: webDevTopic,
      difficulty: "intermediate",
      tags: ["javascript", "programming", "book"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/",
      description: "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.",
      type: "article",
      topicId: webDevTopic,
      difficulty: "beginner",
      tags: ["documentation", "html", "css", "javascript"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Vue.js Official Guide",
      url: "https://vuejs.org/guide/",
      description: "Official Vue.js documentation and tutorial for building user interfaces.",
      type: "course",
      topicId: webDevTopic,
      difficulty: "beginner",
      tags: ["vue", "javascript", "frontend", "framework"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    // Add comprehensive resources for DSA
    await ctx.db.insert("resources", {
      title: "LeetCode - Two Sum Problem",
      url: "https://leetcode.com/problems/two-sum/",
      description: "Classic algorithmic problem to find two numbers that add up to a target.",
      type: "practice",
      topicId: dsaTopic,
      difficulty: "beginner",
      tags: ["algorithms", "arrays", "hash-table", "leetcode"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Big O Notation Explained",
      url: "https://www.freecodecamp.org/news/big-o-notation-explained-with-examples/",
      description: "Understanding time and space complexity in algorithms.",
      type: "article",
      topicId: dsaTopic,
      difficulty: "beginner",
      tags: ["algorithms", "complexity", "big-o", "theory"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Introduction to Algorithms (CLRS)",
      url: "https://mitpress.mit.edu/books/introduction-algorithms-third-edition",
      description: "The definitive textbook on algorithms and data structures.",
      type: "book",
      topicId: dsaTopic,
      difficulty: "advanced",
      tags: ["algorithms", "data-structures", "textbook", "advanced"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "HackerRank Data Structures",
      url: "https://www.hackerrank.com/domains/data-structures",
      description: "Practice problems for data structures and algorithms.",
      type: "practice",
      topicId: dsaTopic,
      difficulty: "intermediate",
      tags: ["algorithms", "practice", "hackerrank", "data-structures"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    // Add comprehensive resources for AI/ML
    await ctx.db.insert("resources", {
      title: "Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course",
      description: "Google's free machine learning course with TensorFlow.",
      type: "course",
      topicId: aiMlTopic,
      difficulty: "intermediate",
      tags: ["machine-learning", "tensorflow", "google", "course"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Introduction to Neural Networks",
      url: "https://www.youtube.com/watch?v=aircAruvnKk",
      description: "3Blue1Brown's excellent video series on neural networks.",
      type: "video",
      topicId: aiMlTopic,
      difficulty: "beginner",
      tags: ["neural-networks", "deep-learning", "video", "3blue1brown"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Fast.ai Practical Deep Learning",
      url: "https://course.fast.ai/",
      description: "Practical deep learning course using PyTorch and fastai library.",
      type: "course",
      topicId: aiMlTopic,
      difficulty: "intermediate",
      tags: ["deep-learning", "pytorch", "fastai", "practical"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Pattern Recognition and Machine Learning",
      url: "https://www.microsoft.com/en-us/research/people/cmbishop/",
      description: "Christopher Bishop's comprehensive textbook on machine learning.",
      type: "book",
      topicId: aiMlTopic,
      difficulty: "advanced",
      tags: ["machine-learning", "pattern-recognition", "textbook", "advanced"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    // Add comprehensive resources for CS Fundamentals
    await ctx.db.insert("resources", {
      title: "Computer Science 101",
      url: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
      description: "Harvard's CS50 course covering fundamental computer science concepts.",
      type: "course",
      topicId: csFundamentalsTopic,
      difficulty: "beginner",
      tags: ["computer-science", "harvard", "cs50", "fundamentals"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Operating System Concepts",
      url: "https://www.os-book.com/",
      description: "Comprehensive textbook on operating system concepts and design.",
      type: "book",
      topicId: csFundamentalsTopic,
      difficulty: "advanced",
      tags: ["operating-systems", "textbook", "advanced"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Computer Networks: A Systems Approach",
      url: "https://book.systemsapproach.org/",
      description: "Free textbook on computer networking principles and protocols.",
      type: "book",
      topicId: csFundamentalsTopic,
      difficulty: "intermediate",
      tags: ["networking", "protocols", "systems", "free"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    // Add resources for Databases
    await ctx.db.insert("resources", {
      title: "SQL Tutorial - W3Schools",
      url: "https://www.w3schools.com/sql/",
      description: "Comprehensive SQL tutorial with examples and exercises.",
      type: "course",
      topicId: databasesTopic,
      difficulty: "beginner",
      tags: ["sql", "database", "tutorial", "w3schools"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "MongoDB University",
      url: "https://university.mongodb.com/",
      description: "Free courses on MongoDB and NoSQL database concepts.",
      type: "course",
      topicId: databasesTopic,
      difficulty: "beginner",
      tags: ["mongodb", "nosql", "database", "free"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    // Add resources for Cloud Computing
    await ctx.db.insert("resources", {
      title: "AWS Training and Certification",
      url: "https://aws.amazon.com/training/",
      description: "Official AWS training courses and certification programs.",
      type: "course",
      topicId: cloudTopic,
      difficulty: "intermediate",
      tags: ["aws", "cloud", "certification", "training"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Google Cloud Training",
      url: "https://cloud.google.com/training",
      description: "Google Cloud Platform training and certification resources.",
      type: "course",
      topicId: cloudTopic,
      difficulty: "intermediate",
      tags: ["google-cloud", "cloud", "certification", "training"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    // Add resources for Cybersecurity
    await ctx.db.insert("resources", {
      title: "Cybersecurity Fundamentals",
      url: "https://www.coursera.org/specializations/cyber-security",
      description: "Comprehensive cybersecurity course covering fundamentals to advanced topics.",
      type: "course",
      topicId: cybersecurityTopic,
      difficulty: "beginner",
      tags: ["cybersecurity", "security", "coursera", "fundamentals"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "OWASP Top Ten",
      url: "https://owasp.org/www-project-top-ten/",
      description: "The OWASP Top 10 is a standard awareness document for developers and web application security.",
      type: "article",
      topicId: cybersecurityTopic,
      difficulty: "intermediate",
      tags: ["owasp", "security", "web-security", "awareness"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    // Add resources for Systems Programming
    await ctx.db.insert("resources", {
      title: "The C Programming Language",
      url: "https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628",
      description: "The definitive guide to C programming by Brian Kernighan and Dennis Ritchie.",
      type: "book",
      topicId: systemsTopic,
      difficulty: "intermediate",
      tags: ["c-programming", "systems", "kernighan", "ritchie"],
      featured: true,
      approved: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("resources", {
      title: "Linux From Scratch",
      url: "http://www.linuxfromscratch.org/",
      description: "Learn how to build a Linux system from source code.",
      type: "course",
      topicId: systemsTopic,
      difficulty: "advanced",
      tags: ["linux", "systems", "from-scratch", "advanced"],
      featured: false,
      approved: true,
      createdAt: Date.now(),
    });

    return { success: true, message: "CS Resource Directory seeded successfully with 8 topics and 20+ resources!" };
  },
}); 