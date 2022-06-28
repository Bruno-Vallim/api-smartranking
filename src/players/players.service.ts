import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}
  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const findPlayer = await this.playerModel.findOne({ email }).exec();

    if (findPlayer) {
      await this.updatePlayer(createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async findPlayerEmail(email: string): Promise<Player> {
    const findPlayer = await this.playerModel.findOne({ email }).exec();
    if (!findPlayer) {
      throw new NotFoundException(
        `Jogador com o e-mail ${email} não encontrado`,
      );
    }
    return findPlayer;
  }

  async deletePlayer(email): Promise<any> {
    return await this.playerModel.remove(email).exec()
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec()
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return await createdPlayer.save();

  }

  private async updatePlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ email: createPlayerDto }, { $set: createPlayerDto })
      .exec();
  }
}
