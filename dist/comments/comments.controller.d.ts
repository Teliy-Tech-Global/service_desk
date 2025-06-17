import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(ticketId: string, dto: CreateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    findAll(ticketId: string): Promise<import("./entities/comment.entity").Comment[]>;
    findOne(id: string): Promise<import("./entities/comment.entity").Comment | null>;
    update(id: string, dto: UpdateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    remove(id: string): Promise<import("./entities/comment.entity").Comment>;
}
