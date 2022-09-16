import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getDocs,
  getFirestore,
  collection,
  Firestore,
} from "firebase/firestore/lite";
import { IOldCourse } from "src/types/ICourse";
import { IOldReview } from "src/types/IReview";

export default class Firebase {
  private config: FirebaseOptions;
  private store: Firestore;

  constructor(firebaseConfig: FirebaseOptions) {
    this.config = firebaseConfig;
  }

  async start(): Promise<void> {
    if (!!this.config) {
      return;
    }
    this.store = getFirestore(initializeApp(this.config));
  }

  async stop(): Promise<void> {
    // do nothing
  }

  async getSnapshot(collectionName: string) {
    const col = collection(this.store, collectionName);
    return await getDocs(col);
  }

  async getCourses() {
    const courses: {
      [code: string]: IOldCourse;
    } = {};

    const coursesSnapshot = await this.getSnapshot("courses");
    coursesSnapshot.docs.forEach((doc) => {
      courses[doc.id] = doc.data() as IOldCourse;
    });

    return courses;
  }

  async getReviews() {
    if (!!this.config) {
      return mockData;
    }
    const reviews: {
      [id: string]: IOldReview;
    } = {};

    const reviewsSnapshot = await this.getSnapshot("reviews");
    reviewsSnapshot.docs.forEach((doc) => {
      reviews[doc.id] = doc.data() as IOldReview;
    });
    return reviews;
  }
}

const mockData = {
  "1": {
    id: "yeet1",
    courseCode: "COMP1511",
    termTaken: "22T1",
    comment: "This course was great!",
    rating: {
      usefulness: 5,
      enjoyment: 5,
      difficulty: 5,
      workload: 5,
      overall: 5,
    },
  },
  "2": {
    id: "yeet2",
    courseCode: "COMP1531",
    termTaken: "22T2",
    comment: "This course was great!",
    rating: {
      usefulness: 5,
      enjoyment: 5,
      difficulty: 5,
      workload: 5,
      overall: 5,
    },
  },
};
