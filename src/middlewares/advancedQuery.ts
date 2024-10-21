import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AdvancedResults } from "../types/interfaces";
import { db } from "../utils/db.server";

// model delegates
type ModelDelegate = keyof PrismaClient;

const advancedResults = (model: ModelDelegate, populate?: any) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let results: any;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Prisma filters
    const filters: Record<string, any> = {};

    if (reqQuery) {
      Object.keys(reqQuery).forEach((key) => {
        if (["gt", "gte", "lt", "lte", "in"].includes(key)) {
          filters[key] = { [`${key}`]: reqQuery[key] };
        } else {
          filters[key] = reqQuery[key];
        }
      });
    }

    // Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 25;
    const startIndex = (page - 1) * limit;

    // Query using Prisma
    const query = (db[model] as any).findMany({
      where: filters,
      skip: startIndex,
      take: limit,
      orderBy: req.query.sort
        ? { [req.query.sort as string]: "asc" }
        : { createdAt: "desc" },
    });

    results = await query;

    // Get total count
    const total = await (db[model] as any).count({
      where: filters,
    });

    // Pagination result
    const pagination: Record<string, any> = {};

    if (startIndex + limit < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const responseData: AdvancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    res.advancedResults = responseData;

    next();
  });

export default advancedResults;
