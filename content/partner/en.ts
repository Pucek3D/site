import type { PartnerCopy } from './types'

/**
 * Partner copy ("website content.pdf"), revised per the October 2026 website
 * feedback notes. "[Agency Name]" is ADelier Commerce.
 */
export const en: PartnerCopy = {
  signoff: 'ADelier Commerce — Amazon advertising, marketplace expertise and applied training.',
  homeImageAlts: {
    hero: 'Professional reviewing advertising analysis at a laptop (illustrative photography)',
    agencies: 'Two business partners shaking hands over a desk with a laptop',
    brands: 'Two colleagues discussing an illustrative advertising report on a screen',
    training: 'Trainer presenting a PPC programme outline to a small group',
  },
  pageNames: {
    agencies: 'Amazon PPC Agency Partnerships',
    brands: 'Amazon PPC Management & Training for Brands',
    training: 'Amazon PPC Training',
  },

  home: {
    hero: {
      eyebrow: "Amazon advertising, marketplace expertise and applied training",
      title: "Improve Amazon performance. Build the capability\nbehind it.",
      paragraphs: [
        "Expert Amazon PPC management, data-driven optimisation and practical training for consumer brands and the agencies that serve them.",
        "We turn campaign data into smarter decisions, stronger performance and skills that last.",
      ],
      primaryCta: "Let's Talk",
      routes: {
        agencies: "Explore agency partnerships",
        brands: "Explore brand services",
        training: "Explore training",
      },
    },
    autopilot: {
      title: "Amazon advertising is too important to leave on autopilot.",
      paragraphs: [
        "Competition is growing. Advertising costs are rising. Margins are under pressure.",
        "Spending more isn't always the answer. Better decisions are.",
        "At ADelier Commerce, we look beyond individual campaign metrics to understand what drives performance, where budgets are being wasted and where new growth opportunities exist.",
      ],
      closingLine: "Every account is different. Your strategy should be, too.",
    },
    whatWeDo: {
      title: "Expertise that makes a difference.",
      items: [
        {
          number: "01",
          name: "Agency Partnerships",
          tagline: "Your clients. Your brand. Our expertise.",
          paragraphs: [
            "White-label PPC delivery or dedicated Amazon advertising specialists who integrate into your team's workflows.",
          ],
        },
        {
          number: "02",
          name: "Amazon PPC Management",
          tagline: "Your advertising. Actively managed.",
          paragraphs: [
            "Tailored advertising strategies, active campaign management and continuous optimisation focused on advertising efficiency and sustainable sales growth.",
          ],
        },
        {
          number: "03",
          name: "Amazon PPC Training",
          tagline: "Build expertise within your own team.",
          paragraphs: [
            "Practical, expert-led training that equips your team with the knowledge and skills to manage Amazon advertising more effectively.",
          ],
        },
      ],
    },
    approach: {
      title: "How campaign evidence becomes decisions",
      subtitle: "No autopilot. No one-size-fits-all strategies.",
      intro: "Every recommendation starts with the data in your account and ends with a named expert accountable for the decision.",
      items: [
        {
          title: "In-depth performance analysis",
          body: "We analyse campaign performance and the KPIs underneath it, including ACOS, ROAS, conversion and the relationship between advertising and total sales.",
        },
        {
          title: "Review of the current setup",
          body: "We review account and campaign structure, targeting, budget allocation, search-term signals and efficiency, where the data is available.",
        },
        {
          title: "Diagnosis before action",
          body: "We identify what is underperforming and why, including relevant listing and offer context, before changing bids or budgets.",
        },
        {
          title: "Tailored, prioritised recommendations",
          body: "Recommendations are built around your products, margins, competition and goals, and ordered so you know what to address first.",
        },
        {
          title: "Human ownership of decisions",
          body: "AI can speed up research and reporting. Decisions stay with a named expert, who explains what changed and why.",
        },
      ],
    },
    audiences: {
      eyebrow: "Who we work with",
      title: [
        "Two paths.",
        "One performance standard.",
      ],
      subtitle: "Expert-led Amazon growth, built around how you work.",
      brands: {
        label: "Brands",
        headline: [
          "Your brand.",
          "Our focus.",
        ],
        description: "Expert-led PPC management and practical training built around your products, performance and people.",
        cta: "Explore brand services",
      },
      agencies: {
        label: "Agencies",
        headline: [
          "Your clients.",
          "Our expertise.",
        ],
        description: "White-label PPC delivery and dedicated specialists, without compromising your client relationships.",
        cta: "Explore agency partnerships",
      },
    },
    final: {
      title: "Ready to make more of Amazon advertising?",
      paragraphs: [
        "Whether you're growing your brand or looking for a trusted Amazon PPC partner, let's explore how we can work together.",
      ],
      cta: "Let's talk",
    },
  },

  brands: {
    hero: {
      eyebrow: "For Brands · Amazon PPC & Training",
      title: "Amazon PPC expertise. Managed for you or built within your team.",
      emphasis: "Two ways to move forward: Amazon PPC Management or practical PPC Training.",
      paragraphs: [
        "Whether you're launching a new brand or growing an established one, ADelier helps you succeed on Amazon through expert PPC management and practical team training.",
        "Choose managed advertising, in-house training or both — tailored to your goals and data.",
      ],
      primaryCta: "Explore PPC management",
      secondaryCta: "Explore PPC training",
      imageAlt: "Two colleagues discussing an illustrative advertising report on a screen",
    },
    opportunity: {
      title: "Your brand. Your Amazon opportunity.",
      paragraphs: [
        "Amazon offers access to millions of customers and opportunities to grow internationally.",
        "ADelier helps you launch your brand, manage your advertising or train your team to manage campaigns themselves.",
      ],
      lead: "Amazon's scale speaks for itself",
      figures: [
        {
          value: "$45.9bn",
          label: "Amazon net sales attributed to Germany (2025)",
        },
        {
          value: "$43.2bn",
          label: "Amazon net sales attributed to the UK (2025)",
        },
      ],
      growth: "Growing opportunity — Polish brands can reach customers at home and abroad.",
      footnote: "Germany and UK figures are Amazon's country-attributed net sales, not marketplace sales alone. Source: Amazon.com, Inc., Form 10-K for fiscal year 2025.",
    },
    ppc: {
      label: "Amazon PPC Management",
      title: "Stronger advertising. Smarter decisions. Better performance.",
      paragraphs: [
        "We manage and optimise your Amazon campaigns with a focus on advertising efficiency and sustainable sales growth.",
        "We analyse performance, identify opportunities and make informed decisions to improve results.",
      ],
      cycleTitle: "How we manage your account",
      cycle: [
        {
          title: "Account and campaign review",
          body: "Review account structure, keyword coverage, targeting, budget allocation and search-term signals, together with relevant listing and offer context.",
        },
        {
          title: "Goals and commercial context",
          body: "Agree objectives informed by products, margins, competition, advertising history and the brand’s commercial priorities.",
        },
        {
          title: "Campaign architecture",
          body: "Organise relevant campaign structures, targeting approaches and advertising formats to improve control and budget allocation.",
        },
        {
          title: "Active campaign management",
          body: "Monitor and manage campaigns at the agreed cadence, analysing search terms, bids, budgets and opportunities for improvement.",
        },
        {
          title: "Expert-led optimisation",
          body: "Review ACOS, ROAS and available total-sales information alongside profitability, organic performance and the brand’s wider growth objectives.",
        },
        {
          title: "Transparent reporting",
          body: "Explain performance, actions taken, findings, challenges and recommended next steps, according to the agreed reporting scope.",
        },
      ],
      // Amazon DSP is deliberately NOT listed: delivery capability is unverified and
      // flagged for commercial review. Add it here only once it is confirmed.
      manage: {
        title: "Our services include",
        items: [
          "Tailored PPC strategy and campaign structure",
          "Ongoing monitoring and optimisation",
          "Keyword and targeting strategy",
          "Budget allocation and spend efficiency",
          "Performance analysis and reporting",
          "Focus on ACOS, ROAS and overall sales",
        ],
        note: "The precise scope depends on your marketplace, account setup, advertising goals and agreed engagement.",
      },
      cta: "Discuss your advertising needs",
    },
    training: {
      label: "PPC Training for Brand Teams",
      title: "Prefer to manage advertising in-house? We'll help you build the skills.",
      paragraphs: [
        "Not every business wants to hire an agency. We train brand, e-commerce and marketing teams to manage Amazon PPC confidently and make better advertising decisions.",
        "Training is available independently or alongside our management services.",
      ],
      listLabel: "Depending on your needs, it can include:",
      items: [
        "Campaign structure, keywords and targeting",
        "Budget management and optimisation",
        "ACOS, ROAS and performance analysis",
        "Practical exercises using your campaign data, where available",
        "Actionable recommendations and an implementation plan",
      ],
      cta: "Enquire about PPC training",
      imageAlt: "Trainer presenting a PPC programme outline to a small group",
    },
    final: {
      eyebrow: "Let’s talk about your Amazon goals",
      title: "Ready to grow your brand on Amazon?",
      paragraphs: [
        "Whether you need expert campaign management or want to develop your team's in-house capabilities, ADelier can help.",
      ],
      cta: "Let's talk about your brand",
      trainingLink: "Explore PPC training",
    },
  },

  agencies: {
    hero: {
      eyebrow: "For agencies · Amazon PPC partnerships",
      title: "Expand your Amazon offer. Keep the client relationship.",
      emphasis: "Your clients. Your brand. Our expertise.",
      paragraphs: [
        "ADelier helps marketing and media agencies expand their Amazon PPC capabilities through flexible partnership models. Our Poland-based specialists work within your workflows, quality standards and reporting structure, while you retain control of your client relationships.",
      ],
      primaryCta: "Discuss an agency partnership",
      secondaryCta: "Explore partnership models",
      imageAlt: "Two business partners shaking hands over a desk with a laptop",
    },
    ways: {
      eyebrow: "The partnership models",
      title: "Two ways to work with us",
      intro: "Choose managed campaign delivery or specialist capacity integrated with your team. Scope, ownership, approvals and reporting are agreed before work begins.",
      models: [
        {
          name: "White-label PPC management",
          summary: "Your clients. Your brand. Our delivery.",
          paragraphs: [
            "We manage Amazon advertising campaigns behind the scenes under your agency's brand. We follow your processes, reporting requirements and quality standards, allowing you to expand your service offering without building an in-house PPC team.",
          ],
          listLabel: "Possible scope, where agreed:",
          items: [
            "Campaign monitoring and optimisation at the agreed cadence",
            "Bid and budget management",
            "Search-term and keyword analysis",
            "Campaign structure and targeting improvements",
            "Performance reporting",
            "Implementation of your agency-approved strategy",
          ],
          note: "We do not contact your clients directly unless you have agreed to it.",
        },
        {
          name: "Dedicated PPC specialist",
          summary: "A named specialist working within your team.",
          paragraphs: [
            "Get dedicated Amazon PPC support from a Poland-based specialist integrated into your agency's workflows, tools and reporting structure.",
            "Responsibilities, availability, task allocation, approvals and escalation processes are agreed in advance, giving you additional capacity while maintaining control over delivery.",
          ],
          listLabel: "What it can give your agency:",
          items: [
            "Flexible specialist capacity as your client portfolio changes",
            "Less need for immediate local recruitment",
            "Operational continuity on the accounts they support",
            "English-language collaboration",
            "Capacity planning and quality oversight from ADelier",
          ],
          note: "A distinct embedded-capacity model: not ADelier-managed delivery, and not an employment placement.",
        },
      ],
    },
    why: {
      eyebrow: "Why partner with us?",
      title: [
        "Built to extend your agency.",
        "Not complicate it.",
      ],
      items: [
        {
          title: "A practical extension of your team",
          body: "We take on the operational work that keeps advertising accounts running, so your strategists and account leads can concentrate on strategy, client relationships and business development.",
        },
        {
          title: "A hands-on approach",
          body: "We don't set campaigns up and leave them unattended. Work is actively managed and reviewed by experts.",
        },
        {
          title: "Flexible collaboration",
          body: "Start with one model and adjust the engagement by agreement as your requirements change.",
        },
        {
          title: "Confidentiality and control",
          body: "We work within the confidentiality, non-solicitation and client-protection terms agreed in your contract, to your standards and within an agreed scope. Your client relationships and approval rights stay with you.",
        },
      ],
    },
    approach: {
      eyebrow: "The delivery process",
      title: "A clear process. Expert accountability.",
      subtitle: "From account assessment to transparent reporting.",
      intro: "The same expert-led sequence sits behind both models.",
      steps: [
        {
          label: "Assess",
          text: "Account and setup assessment.",
        },
        {
          label: "Analyse",
          text: "Performance analysis, including ACOS, ROAS and paid versus total sales where reliable data is available.",
        },
        {
          label: "Prioritise",
          text: "Translate the findings into a clear, prioritised action plan.",
        },
        {
          label: "Execute",
          text: "Implement agreed actions with expert review and quality control.",
        },
        {
          label: "Report",
          text: "Transparent performance reporting, insights and recommended next actions.",
        },
      ],
    },
    training: {
      eyebrow: "Build your team's capability",
      title: "Build PPC capability inside your agency.",
      body: "Practical Amazon PPC training for agency account, strategy and delivery teams. Work with real campaign scenarios, strengthen your optimisation routines and develop working standards your team can apply independently, depending on the agreed programme. Training is available on its own, without a delivery or specialist engagement.",
      cta: "Explore PPC training",
      imageAlt: "Trainer presenting a PPC programme outline to a small group",
    },
    final: {
      title: "Ready to expand your Amazon PPC capabilities?",
      paragraphs: [
        "Whether you need white-label campaign management or a dedicated specialist, ADelier can help you scale your Amazon offering with flexibility and confidence.",
      ],
      cta: "Discuss an agency partnership",
      trainingLink: "Or explore PPC training for your team",
    },
  },

  training: {
    hero: {
      eyebrow: "Amazon PPC training",
      title: "Build your in-house Amazon PPC expertise.",
      subtitle: "Practical training. Real advertising decisions. Skills your team can apply.",
      paragraphs: [
        "Practical Amazon PPC training for brand, e-commerce, marketing and agency teams that want to strengthen their advertising knowledge and make more confident decisions.",
        "Our sessions combine advertising fundamentals, performance analysis and hands-on optimisation exercises. Where appropriate access is available, teams can work with their own campaign data and apply what they learn to real advertising challenges.",
      ],
      standalone: "Standalone training. No PPC management contract required.",
      primaryCta: "Discuss your training needs",
      secondaryCta: "Explore training topics",
      imageAlt: "Trainer presenting a PPC programme outline to a small team",
    },
    experience: {
      eyebrow: "The learning experience",
      title: "How the training works",
      intro: "Every programme is scoped with your team. Format, curriculum and deliverables are agreed for each engagement; the three stages below describe our approach, not a fixed timetable.",
      steps: [
        {
          title: "Understand the starting point",
          body: "Training is adapted to the audience and its current level of knowledge.",
          points: [
            "No prerequisites for foundation-level training.",
            "Advanced workshops assume working knowledge of Amazon advertising.",
          ],
        },
        {
          title: "Practise on real decisions",
          body: "Sessions work through practical PPC scenarios. Where appropriate access is available, exercises can use your team's own account or campaign data; live access is not required to take part.",
        },
        {
          title: "Apply the learning",
          body: "Teams work toward actionable next steps. Depending on the agreed programme scope, this may include quality rubrics for reviewing campaign work and an implementation plan.",
        },
      ],
      support: [
        { title: "Who it is for", body: "Brand, marketing, e-commerce and agency PPC teams, at different experience levels." },
        { title: "Follow-up", body: "Optional follow-up sessions or coaching can be agreed separately." },
        { title: "Purchased on its own", body: "Training does not require PPC management." },
      ],
    },
    curriculum: {
      eyebrow: "Training content",
      title: "Training tailored to your team",
      intro: "Focused on what your team needs most. From PPC fundamentals to advanced optimisation, we tailor the training content to your team's experience, advertising challenges and goals.",
      items: [
        { title: "Amazon PPC Fundamentals", body: "Advertising formats, campaign structures, targeting options, bidding strategies and core performance metrics." },
        { title: "Campaign Optimisation", body: "Performance analysis, bid and budget adjustments, search-term management and opportunities to improve advertising efficiency." },
        { title: "Advanced Targeting Strategies", body: "Keyword harvesting, negative targeting, competitor targeting, keyword isolation and more advanced campaign approaches." },
        { title: "Performance Analysis", body: "Interpret ACOS, ROAS, conversion rates, advertising sales and total sales to make informed decisions." },
        { title: "Practical Account Workshops", body: "Apply relevant concepts to real campaign scenarios and available account data, identify opportunities and develop prioritised optimisation actions." },
      ],
    },
    formats: {
      eyebrow: "Flexible training formats",
      title: "Training that fits your team.",
      paragraphs: [
        "Training can be adapted to your team's experience and learning objectives, from foundational sessions for new employees to advanced workshops for existing PPC practitioners.",
        "Our aim is to help your team develop practical knowledge and working methods they can apply to real Amazon advertising decisions.",
      ],
      cta: "Discuss your training needs",
      options: [
        {
          label: "Foundations",
          title: "Build a shared PPC knowledge base.",
          body: "Foundational learning for team members who need to understand Amazon advertising structures, targeting, bidding and core performance metrics.",
        },
        {
          label: "Advanced workshops",
          title: "Strengthen analytical and optimisation skills.",
          body: "Practical workshops focused on more advanced campaign decisions and problem-solving.",
        },
        {
          label: "Optional follow-up",
          title: "Support continued application.",
          body: "Additional coaching or review sessions may be agreed separately after the training programme.",
        },
      ],
    },
  },

  about: {
    hero: {
      title: 'A more personal approach to Amazon advertising',
      subtitle: 'We Believe Every Brand Deserves More Than an Autopilot Approach.',
      paragraphs: [
        'Amazon advertising is not a one-size-fits-all exercise. Every product, market, competitive environment and business objective presents a different set of challenges.',
      ],
    },
    // TODO: owner approval / specific accurate wording — experience with major brands and within
    // large media agencies. Publish only once the founders confirm how it may be attributed.
    paragraphs: [
      'ADelier Commerce is a Poland-based marketplace partner working with consumer brands and marketing agencies internationally. We combine focused Amazon advertising expertise, detailed performance analysis, practical training and direct expert accountability.',
      'We help with the problems that hold Amazon advertising back: campaigns left on autopilot, budget spent without a clear rationale, and teams that lack the time or specialist knowledge to make confident decisions.',
      "We believe effective PPC management requires curiosity, analytical thinking, attention to detail and a genuine interest in understanding each client's business.",
      'Our operating model is designed to deliver attentive, tailored work and competitive economics without reducing the standard of review.',
    ],
    pillars: {
      title: 'What makes our model different',
      items: [
        {
          title: 'Specialist expertise',
          body: 'Deep focus on Amazon advertising and marketplace commerce, rather than a broad catalogue of unrelated services.',
        },
        {
          title: 'Data-led diagnosis',
          body: 'We look at the numbers, question assumptions and translate our findings into tailored, prioritised recommendations.',
        },
        {
          title: 'Personal, accountable service',
          body: 'Expert-led work with a named decision owner, close collaboration and straightforward communication.',
        },
        {
          title: 'Competitive operating economics',
          body: 'A highly skilled team based in Poland, giving strong value without compromising the quality of the work.',
        },
      ],
    },
    forBrands: 'For brands, that means an advertising partner who takes the time to understand their business.',
    forAgencies: 'For agencies, it means a dependable extension of their team, committed to quality execution and operational efficiency.',
    goal: 'Our goal is to help businesses make better advertising decisions, use their resources more effectively and build a stronger foundation for growth on Amazon.',
    closing: ['Thoughtful strategy. Active management. Individual attention.', "That's how we approach Amazon advertising."],
  },
}
