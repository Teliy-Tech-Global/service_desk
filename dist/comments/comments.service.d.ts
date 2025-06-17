import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
export declare class CommentsService {
    private commentRepo;
    private ticketRepo;
    private userRepo;
    constructor(commentRepo: Repository<Comment>, ticketRepo: Repository<Ticket>, userRepo: Repository<User>);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAllByTicket(ticketId: number): Promise<Comment[]>;
    findOne(id: number): Promise<Comment | null>;
    update(id: number, updateDto: UpdateCommentDto): Promise<Comment>;
    remove(id: number): Promise<Comment>;
}
