import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    try {
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExeption(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        // TODO: Relaciones
      });
      const counts = products.length;

      return { products, counts };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(term: string) {
    let product: Product;
    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder: SelectQueryBuilder<Product> =
        this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug=:slug`, {
          title: term.toUpperCase(),
          slug: term,
        })
        .getOne();
    }
    if (!product) {
      throw new NotFoundException(`Product with search #${term} no exist"`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product: Product = await this.productRepository.preload({
        id,
        ...updateProductDto,
      });
      if (!product) {
        throw new NotFoundException(`Product with id #${id} no exist"`);
      }
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExeption(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { id };
  }

  private handleDBExeption(error: any) {
    console.log(error);

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    if (error.code === '23502') {
      throw new BadRequestException(`#${error.column} violates not-null.`);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Create Product cheque de error');
  }
}
