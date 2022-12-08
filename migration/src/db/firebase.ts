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
    this.config = {
      ...firebaseConfig,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
    };
  }

  async start(): Promise<void> {
    this.store = getFirestore(initializeApp(this.config));
    console.log("Started up firebase!");
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
