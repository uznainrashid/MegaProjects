import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  bucket;
  constructor() {
    this.Client.
    setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          status,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite serivce :: createPost :: Error", error);
    }
  }
  async UpdatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          status,
          featuredImage,
          content,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async DeletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite serivce :: deletePost :: Error ", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite services :: getPost :: Error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite service :: getPosts :: Error", error);
      return false;
    }
  }
  async UploadFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("appwrite service :: upload :: Error", error);
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite service :: deleteFile :: Error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
