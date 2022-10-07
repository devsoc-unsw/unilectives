import { ICourse } from "src/interfaces/ResponseInterface";

// TODO: someone fill this in pls
// TODO: pls change terms to list of strings thx- Hexamesters?
// Terms: "None"?, e.g distributed systems
export const mockCourses: ICourse[] = [
  {
    courseCode: "COMP1511",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description:
      "An introduction to problem-solving via programming, which aims to have students develop \
      proficiency in using a high level programming language. Topics: algorithms, program structures \
      (statements, sequence, selection, iteration, functions), data types (numeric, character), data \
      structures arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction \
      to analysis of algorithms, testing, code quality, teamwork, and reflective practice. The course \
      includes extensive practical work in labs and programming projects. Additional Information: \
      This course should  be taken by all CSE majors, and any other students who have an interest \
      in computing or who wish to be extended. It does not require any prior computing knowledge \
      or experience. COMP1511 leads on to COMP1521, COMP1531, COMP2511 and COMP2521, which form the \
      core of the study of computing at UNSW and which are pre-requisites for the full range of further \
      computing courses. Due to overlapping material, students who complete COMP1511 may not also enrol \
      in COMP1911 or COMP1921.",
    enrolmentRules: "",
    equivalents: ["COMP1917", "DPST1091"],
    exclusions: ["DPST1091"],
    faculty: "Faculty of Engineering",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [0, 1, 2, 3],
    title: "Programming Fundamentals",
    uoc: 6,
    rating: 4,
  },
  {
    courseCode: "COMP1531",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description:
      "This course provides an introduction to software engineering principles: basic software \
      lifecycle concepts, modern development methodologies, conceptual modeling and how these \
      activities relate to programming. It also introduces the basic notions of team-based project \
      management via conducting a project to design, build and deploy a simple web-based application. \
      It is typically taken in the term after completing COMP1511, but could be delayed and taken \
      later. It provides essential background for the teamwork and project management required in \
      many later courses.The goal of this course is to expose the students to:basic elements of \
      software engineering: including requirements elicitation, analysis and specification; design; \
      construction; verification and validation; deployment; and operation and maintenancedata modelling \
      software engineering methodologies, processes, measurements, tools and techniquesWeb-based \
      system architecture and development practices on Web platforms.",
    enrolmentRules:
      "Prerequisite: COMP1511 or DPST1091 or COMP1917 or COMP1921",
    equivalents: [],
    exclusions: ["SENG1010", "SENG1020", "SENG1031"],
    faculty: "Faculty of Engineering",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [2, 3],
    title: "Software Engineering Fundamentals",
    uoc: 6,
    rating: 4.5,
  },

  {
    courseCode: "POGG1011",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description: "pog course with epic rating",
    enrolmentRules: "",
    equivalents: [],
    exclusions: [],
    faculty: "Faculty of Science",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [0],
    title: "Pog Fundamentals Fundamentals",
    uoc: 6,
    rating: 5,
  },

  {
    courseCode: "UNPOG101",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description: "unpog course with crap rating",
    enrolmentRules: "",
    equivalents: [],
    exclusions: [],
    faculty: "Faculty of Science",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [0],
    title: "Unpog Fundamentals",
    uoc: 6,
    rating: 1,
  },
  {
    courseCode: "COMP1010",
    description: "Computational thinking is a critical skill in modern society. This course aims to provide you with an understanding of the foundations of computing, how software systems work, and how to construct new software systems. By the end of the course, you will have produced an application (app) of your choice, solving a problem that's important to you.",
    equivalents: [],
    exclusions: [
      "ENGG1811"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "The Art of Computing",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 2.5
  },
  {
    courseCode: "COMP1511",
    description: "An introduction to problem-solving via programming, which aims to have students develop proficiency in using a high level programming language. Topics: algorithms, program structures (statements, sequence, selection, iteration, functions), data types (numeric, character), data structures (arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction to\u00a0analysis of algorithms, testing, code quality, teamwork, and reflective practice. The course includes extensive practical work in labs and programming projects.",
    equivalents: [
      "COMP1917",
      "DPST1091"
    ],
    exclusions: [
      "DPST1091"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "Programming Fundamentals",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.5
  },
  {
    courseCode: "COMP1521",
    description: "This course provides a programmer's view on how a computer system executes programs, manipulates data and communicates. It enables students to become effective programmers in dealing with issues of performance, portability, and robustness. It is typically taken in the term after completing COMP1511, but could be delayed and taken later. It serves as a foundation for later courses on networks, operating systems, computer architecture and compilers, where a deeper understanding of systems-level issues is required.",
    equivalents: [
      "DPST1092"
    ],
    exclusions: [
      "DPST1092"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "Computer Systems Fundamentals",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.5
  },
  {
    courseCode: "COMP1531",
    description: "The goal of this course is to expose the students to:",
    equivalents: [],
    exclusions: [
      "SENG1010",
      "SENG1020",
      "SENG1031"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "Software Engineering Fundamentals",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "COMP1911",
    description: "This course introduces students to the basics of programming. The objective of the course is for students to develop proficiency in program design and construction using a high-level programming language. Topics covered include: fundamental programming concepts, the C programming language, programming style, program design and organisation, program testing and debugging. Practical experience of these topics is supplied\u00a0through laboratory exercises and programming assignments.",
    equivalents: [],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      2
    ],
    title: "Computing 1A",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.5
  },
  {
    courseCode: "COMP2041",
    description: "Software system decomposition and design. Overview of the software development life-cycle. Command languages. Version control and configuration management, programming for reliability. Testing and debugging techniques. Profiling and code improvement techniques. Practical work involving programming-in-the-large.",
    equivalents: [
      "COMP9044"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      2
    ],
    title: "Software Construction: Techniques and Tools",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 2,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "COMP2111",
    description: "This course introduces rigorous and formal methods for modelling system behaviour. These methods support the modelling of abstract specifications and the refinement of abstract specifications through to concrete implementations. Consistency of formal development is verified by proof obligations and formal proof. The course will cover: specification, refinement, implementation, proof obligations, and proof. It re-inforces, and builds on, prerequisite knowledge from MATH1081, especially set theory and predicate logic. The course will use case-studies and assignments to develop competence. The methods developed in this course are used in the SENG2011 workshops and in safety-critical industrial contexts.",
    equivalents: [],
    exclusions: [
      "COMP2110"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1
    ],
    title: "System Modelling and Design",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 2,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 5.0
  },
  {
    courseCode: "COMP2511",
    description: "This course aims to introduce students to the principles of object-oriented design and to fundamental techniques in object-oriented programming. It is typically taken in the second year of study, after COMP2521, to ensure an appropriate background in data structures.\u00a0The knowledge gained in COMP2511 is useful in a wide range of later-year CS courses.",
    equivalents: [],
    exclusions: [
      "COMP2011",
      "COMP2911"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      2,
      3
    ],
    title: "Object-Oriented Design & Programming",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 2,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.5
  },
  {
    courseCode: "COMP2521",
    description: "The goal of this course is to deepen students' understanding of data structures and algorithms and how these can be employed effectively in the design of software systems. We anticipate that it will generally be taken in the second year of a program, but since its only pre-requisite is COMP1511, is it possible to take it in first year. It is an important course in covering a range of core data structures and algorithms that will be used in context in later courses.",
    equivalents: [],
    exclusions: [
      "COMP1927"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "Data Structures and Algorithms",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 2,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "COMP3121",
    description: "Correctness and efficiency of algorithms. Computational complexity: time and space bounds. Techniques for best-case, worst-case and average-case time and space analysis. Designing algorithms using induction, divide-and-conquer and greedy strategies. Algorithms: sorting and order statistics, trees, graphs, matrices. Intractability: classes P, NP, and NP-completeness, approximation algorithms.",
    equivalents: [
      "COMP3821",
      "COMP9801"
    ],
    exclusions: [
      "COMP9101",
      "COMP9801"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "Algorithms and Programming Techniques",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 1.0
  },
  {
    courseCode: "COMP3131",
    description: "Covers the fundamental principles in programming languages and implementation techniques for compilers (emphasis on compiler front ends). Course contents include: program syntax and semantics, formal translation of programming languages, finite-state recognisers and regular expressions, context-free parsing techniques such as LL(k( and LR(k), attribute grammars, syntax-directed translation, type checking and code generation. Lab: implementation of a compiler in a modern programming language for a small programming language.",
    equivalents: [
      "COMP9102"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1
    ],
    title: "Programming Languages and Compilers",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.5
  },
  {
    courseCode: "COMP3141",
    description: "This course will present rigorous and formal methods for the design and implementation phases of software system development. Also considered are testing and reuse of designs. As far as possible, software tools that can assist the process will be used. The material will be presented using case studies, and students will be required to undertake a project.",
    equivalents: [],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      2
    ],
    title: "Software System Design and Implementation",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "COMP3151",
    description: "Concurrency = processes + communication. Communication via shared variables vs message passing. Models of concurrency: true concurrency vs interleaving. Abstractions: atomicity, locks and barriers, semaphores, monitors, threads, RPC, rendezvous. Classical problems: mutual exclusion, dining philosophers, sleeping barber, termination detection, gravitational N-body problem.Practical work: programming assignments and proving of program safety and liveness properties.",
    equivalents: [
      "COMP9154"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      2
    ],
    title: "Foundations of Concurrency",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.5
  },
  {
    courseCode: "COMP3153",
    description: "It is virtually impossible to guarantee the correctness of a system, and in turn the absence of bugs by standard software engineering practice such as code review, systematic testing and good software design alone. The formal methods community has developed various rigorous, mathematically sound techniques and tools that allow the automatic analysis of systems and software. The application of these fully automatic techniques is typically called algorithmic verification. The course will describe several automatic verification techniques, the algorithms they are based on, and the tools that support them. We will discuss examples to which the techniques have been applied, and provide experience with the use of several tools.",
    equivalents: [
      "COMP9153"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      2
    ],
    title: "Algorithmic Verification",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.0
  },
  {
    courseCode: "COMP3161",
    description: "Programming language paradigms:  imperative, object oriented, declarative (i.e., functional and logic).  Theoretical foundations of programming languages:  syntax, operatational, axiomatic and denotational semantics.  Implementation aspects of central language features, such as dynamic and strong typing, polymorphism, overloading and automatic memory management.  Abstracting over programming languages and architectures: byte code approach, component software.",
    equivalents: [],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      3
    ],
    title: "Concepts of Programming Languages",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.5
  },
  {
    courseCode: "COMP3211",
    description: "Study the architecture & organisation of modern processors, and influences upon these, with emphasis on pipelined RISC machines; gain understanding of the design of the memory subsystem, I/O, and system level interconnect; become proficient in the use of tools such as VHDL and SimpleScalar for the description, simulation, and verification of architectural designs; complete a series of assignments leading to the design, implementation, validatation and assessment of a RISC system. It is assumed students are familiar with combinational and sequential logic design principles and have some experience in the use of CAD tools to describe and simulate digital systems.",
    equivalents: [
      "COMP9211"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1
    ],
    title: "Computer Architecture",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 1.5
  },
  {
    courseCode: "COMP3222",
    description: "This course aims to provide students with a knowledge of problem solving with digital systems (computer systems and digital circuits). The basic building blocks of combinational and sequential circuits are introduced to develop circuit solutions to problems and to understand and implement the design and operation of hardware models of digital and computer systems. HDLs will be used to describe circuits and state of the art computer aided design tools will be used to design complex systems.",
    equivalents: [
      "COMP2021",
      "COMP9022",
      "COMP9222"
    ],
    exclusions: [
      "ELEC2141"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      3
    ],
    title: "Digital Circuits and Systems",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 2.5
  },
  {
    courseCode: "COMP3231",
    description: "Operating System Organisation and services. Process management: scheduling, synchronisation and multiprocessors. Memory management: virtual memory, and paging. Storage management: file systems and I/O. Case studies include: UNIX & Windows. Programming assignments. Assumed Knowledge: C",
    equivalents: [
      "COMP3891",
      "COMP9201",
      "COMP9283"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1
    ],
    title: "Operating Systems",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.0
  },
  {
    courseCode: "COMP3311",
    description: "Data models: entity-relationship, relational, object-oriented. Relational database management systems: data definition, query languages, development tools. Database application design and implementation. Architecture of relational database management systems: storage management, query processing, transaction processing. Lab: design and implementation of a database application.",
    equivalents: [],
    exclusions: [
      "COMM1822",
      "COMP9311",
      "INFS1603",
      "INFS5992"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      3
    ],
    title: "Database Systems",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.5
  },
  {
    courseCode: "COMP3331",
    description: "Networking technology overview. Protocol design and validation using the finite state automata in conjunction with time-lines. Overview of the IEEE802 network data link protocol standards. Addressing at the data link and network layers. Network layer services. Introduction to routing algorithms such as Distance Vector and Link State. Congestion control mechanisms. Internetworking issues in connecting networks. The Internet Protocol Suite overview. The Internet protocols IPv4 and IPv6. Address resolution using ARP and RARP. Transport layer: issues, transport protocols TCP and UDP. Application level protocols such as: File Transfer Protocol (FTP), Domain Name System (DNS) and Simple Mail Transfer Protocol (SMTP). Introduction to fundamental network security concepts, 802.11 wireless networks and peer to peer networks. There is a substantial network programming component in the assessable material.",
    equivalents: [
      "COMP9331"
    ],
    exclusions: [
      "COMP3931"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1,
      2,
      3
    ],
    title: "Computer Networks and Applications",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 1.5
  },
  {
    courseCode: "COMP3411",
    description: "Machine intelligence. Principles: knowledge representation, automated reasoning, machine learning. Tools: AI programming languages, control methods, search strategies, pattern matching. Applications: computer vision, speech recognition, natural language processing, expert systems, game playing, computer-aided learning. Philosophical and psychological issues. Lab: logic programming assignments.",
    equivalents: [],
    exclusions: [
      "COMP9414",
      "COMP9814"
    ],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      1
    ],
    title: "Artificial Intelligence",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "COMP3421",
    description: "Graphics hardware: scan conversion of lines and polygons. 2D transformations: windowing, clipping, viewports. User interfaces. 3D transformations: perspective transformation, 3D clipping, hidden surface removal, lighting and texture maps. Hierarchical modelling of objects, modelling curves and surfaces with splines and fractals. Graphics standards. Lab: programming assignments.",
    equivalents: [
      "COMP9415"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      3
    ],
    title: "Computer Graphics",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.0
  },
  {
    courseCode: "COMP3431",
    description: "An introduction to Intelligent agent design.  Picking actions using planning, learning or engineered control.  Both practical and theoretical components.  Practical component: Re-implement parts of a real agent architecture on a robot.  Assignment based.  Emphasis on engineering a working system.  Theoretical component: Introduction to a variety of research agent architectures including classical planning and reinforcement learning.  Lecture and lab based.",
    equivalents: [
      "COMP9434"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      3
    ],
    title: "Robotic Software Architecture",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.0
  },
  {
    courseCode: "COMP3511",
    description: "Provides an introduction to user-system interactions, both analysis and design. The approach is cognitive, focusing on matching user goals with computer technologies. Topics: the human information processing system, models of interaction, strategies for and process of design and evaluation. Project work is emphasised.",
    equivalents: [
      "COMP9511"
    ],
    exclusions: [],
    faculty: "Engineering",
    school: "School of Computer Science and Engineering",
    terms: [
      0,
      2
    ],
    title: "Human Computer Interaction",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 3,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.5
  },
  {
    courseCode: "ARTS1010",
    description: "In this course you will examine the practice of the short story. Considering a variety of modernist and contemporary examples, you will explore the principles that have shaped the development of this form such as the use of stream of consciousness, epiphany, the function of compression and the rise of contemporary first person testimonies. In addition, we will look at techniques and strategies crucial to the success of the short form and useful to your development as writers, including point of view, narrative design, the development of voice and the use of economy and symbolism.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      1
    ],
    title: "The Life of Words",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 5.0
  },
  {
    courseCode: "ARTS1011",
    description: "What does it mean to write about ourselves in an age of reality hunger, with genres such as autofiction and memoir proliferating, and with social media providing everyone with a public profile?\u00a0If print culture of the Gutenberg era has given way to digital culture of the Google era, this has only increased the amount of text that we are immersed in. In this course\u00a0you will explore how literature has competed with, absorbed, and remediated new technologies of communication. You will\u00a0approach\u00a0\u2018creative writing\u2019 as a mode of expression that emerges from and circulates\u00a0within a much larger textual environment,\u00a0and you will\u00a0produce your\u00a0own innovative engagements with contemporary media in a practical workshop situation.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      3
    ],
    title: "Inventing the Self: Creative Writing in the Digital Age",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 2.0
  },
  {
    courseCode: "ARTS1030",
    description: "This course introduces you\u00a0to English through the study of literary form. Focusing on the major literary genres of poetry, prose and drama, the course will examine ways of writing in English from a range of periods and cultural traditions including non-British and pre-Twentieth century. It will also introduce you\u00a0to the specialised vocabulary of literary and textual analysis.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      1
    ],
    title: "Forms of Writing: Literature, Genre, Culture",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 1.0
  },
  {
    courseCode: "ARTS1031",
    description: "This course charts a roughly chronological path through the tradition of literature in English from the Renaissance to the twentieth-first century. As we move through the term, you will become familiar with some of the most significant periods and movements in English literary history, immerse yourself in the work of some amazing writers and learn many of the critical tools you need to read, analyse, and understand literature. As the course title implies, one of the themes that we will encounter along the way is the idea of \u201creading\u201d itself: what special practices of reading do we cultivate as students of literature, where did these practices come from and how is the way we read changing and evolving today - as a result, for instance, of changes in the media landscape? Like other English subjects, one of the aims of this course is to help you sharpen your critical reading skills. But it is also one of our assumptions that reading and studying the history of literature in English is the single best way to become a better writer.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      3
    ],
    title: "Reading Through Time",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 2.5
  },
  {
    courseCode: "ARTS1032",
    description: "This introductory course challenges you to think about writing as experimental, world-building, adventurous, challenging, radical, and even dangerous, and to write as though it can change the way things are. It teaches that literature has been the engine-room of many of history\u2019s most decisive changes to social, cultural, ideological, and behavioural norms. Divided into three primary modules \u2013 The Urgency of Now, Utopian Speculation, and Beyond Form and Formlessness \u2013 it exposes you to some of the most exciting and unconventional writing in English, and equips you with some of the skills necessary to resist the cultural conformities that deaden the mind. Treating literature as process, intervention, and experiment, the course asks you to see writing as a lifelong education in how - to use Samuel Beckett's phrase - to fail better.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      2
    ],
    title: "The Literature Laboratory: Writing Beyond Limits",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "ARTS1060",
    description: "In this course you will learn essential techniques and vocabulary for analysing, explaining and interpreting fictional and documentary films, skills that may also be applied to other audio-visual media. You will learn to recognise and apply specialised film studies terminology by closely studying films drawn from a range of contexts and historical periods.",
    equivalents: [],
    exclusions: [
      "FILM1101",
      "MEFT1200"
    ],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      1
    ],
    title: "Introduction to Film Studies",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 2.0
  },
  {
    courseCode: "ARTS1062",
    description: "The 'Hollywood Film' course offers you the opportunity to study the world's most powerful film industry. It produces a historical and conceptual map of the institution that dominated the global film industry in the twentieth century, and which continues to do so today. In focusing on cinema as a socio-cultural and economic force, both in the United States and across the globe, it examines how Hollywood has historically produced and distributed a powerful cultural imaginary and devised methods to encourage audiences to consume it. The course considers Hollywood as an early example of a genuinely global industry that initially sustained itself through the implementation of a range of industrial, economic, cultural, legal, quasi-legal, and indeed illegal conventions and practices, i.e., the star system, the production code, the studio system, the genre system, monopolistic practices like vertical integration, and the Classical Hollywood style of film-making.",
    equivalents: [],
    exclusions: [
      "ARTS2060"
    ],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      3
    ],
    title: "Hollywood Film: Industry, Technology, Aesthetics",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.5
  },
  {
    courseCode: "ARTS1064",
    description: "Subject Area: Film Studies",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      2
    ],
    title: "Screen Production I",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 4.0
  },
  {
    courseCode: "ARTS1090",
    description: "Note: the course code for this course has been updated to MDIA1090 from 2023.",
    equivalents: [],
    exclusions: [
      "MEFT1100"
    ],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      1
    ],
    title: "Media, Culture and Everyday Life",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.5
  },
  {
    courseCode: "ARTS1091",
    description: "Note: the course code for this course has been updated to MDIA1091 from 2023.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      3
    ],
    title: "Media, Society, Politics",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.5
  },
  {
    courseCode: "ARTS1092",
    description: "Note: the course code for this course has been updated to MDIA1092 from 2023.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      2
    ],
    title: "Working with Data",
    uoc: 6,
    genEd: false,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.5
  },
  {
    courseCode: "ARTS1120",
    description: "Do you want to see performance live on stage? Do you want to find out how it\u2019s made? Maybe you\u2019ve been moved by an actor\u2019s performance, amazed by the beauty of an image or caught a glimpse of something beyond words. In this course you will explore how artists create meaningful experiences in performance. Staging scripts, designing scenes, devising actions \u2013 you\u2019ll learn about the process of making theatre and how to put your own ideas into practice. This is a foundational course in performance and production. It opens up opportunities for acting, directing and design, backstage production, script writing and reviewing the arts.",
    equivalents: [],
    exclusions: [
      "MEFT1301",
      "THST1101"
    ],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      1
    ],
    title: "Experiencing Theatre",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 0.5
  },
  {
    courseCode: "ARTS1121",
    description: "This course can also be studied in the following specialisations: Creative Writing, Dance Studies,\u00a0Media, Culture and Technology",
    equivalents: [],
    exclusions: [
      "MEFT1300",
      "THFI1002"
    ],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      2
    ],
    title: "The Life of Performance",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 1.0
  },
  {
    courseCode: "ARTS1122",
    description: "Creativity is a skill that is in high demand. It is the ability to see the world in new ways, to make unexpected connections, and to build solutions. When you're creative, you turn imagination into reality. This empowering course models creative processes developed in the arts for real-world contexts and applications. It develops your skills in creative process \u2013 no matter what your career goals. Drawing on methods developed by ground-breaking musicians, performers, dancers, writers and screen artists, you will be given practical strategies to take risks with your imagination. Hands-on workshops will provide you with the courage to discover through collaboration. A digital gallery of experts will support your lifelong passion for innovating. If you plan to become a teacher, engineer, health clinician or any career professional who wants to make ideas into realities, this course will equip you with a dynamic toolkit for thinking with a difference.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of the Arts and Media",
    terms: [
      3
    ],
    title: "Creativity",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.5
  },
  {
    courseCode: "ARTS1211",
    description: "'Australia\u2019s Asian Context' introduces you to transdisciplinary ways of examining modern Australia's relationship with the Asian region. It examines the conflicting perceptions, images and responses\u00a0that Australians have towards their region and the various events that have impacted upon them. Materials examined include historical documents, literature, art, blogs, cartoons, documentaries, movies as well as academic books and articles. Topics covered include: Asia and the formation of Australian identities, the rise of Asia and Australia\u2019s shifting strategic relationships, the impact of Asian migration and multiculturalism, Asian-Australians' experiences, educating about and for the Asian Century, military engagement in\u00a0Asia, tourism to Asia, economic ties with Asia, and cultural integration with our region.",
    equivalents: [],
    exclusions: [
      "ASIA1101"
    ],
    faculty: "Arts, Design and Architecture",  school: "School of Humanities and Languages",
    terms: [
      3
    ],
    title: "Australia's Asian Context",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.0
  },
  {
    courseCode: "ARTS1240",
    description: "ARTS1240 \u201cEnvironment and Society\u201d recognises the urgency surrounding the current state of Earth. This course focuses on developing critical insights into the human dimensions of environmental issues, from everyday lifestyle decisions to collective choices; including issues such as urban development,\u00a0resource use rights,\u00a0energy access, and food production. ARTS1240 will provide you with tools to analyse how cultural, economic, and political systems impact different ecosystems of which humans are a part. Environment and Society will engage you with examples of how the places that we share with all living creatures are influenced and modified by competing interests. This course aims to inform and encourage thinking that generates local change with ongoing global impacts.",
    equivalents: [],
    exclusions: [],
    faculty: "Arts, Design and Architecture",
    school: "School of Humanities and Languages",
    terms: [
      2
    ],
    title: "Environment and Society",
    uoc: 6,
    genEd: true,
    fieldOfEducation: "ugrad",
    studyLevel: "ugrad",
    level: 1,
    campus: "Kensington",
    calendar: "cal-123",
    attributes: [
      "yeet"
    ],
    archived: false,
    enrolmentRules: "",
    rating: 3.5
  },
];
