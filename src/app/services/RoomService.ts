import Room from "../../models/Room";
import User from "../../models/User";

class RoomService {
  private rooms: Map<string, Room>;
  static roomService: RoomService;

  constructor() {
    this.rooms = new Map();
  }

  static getInstance() {
    if (!RoomService.roomService) {
      RoomService.roomService = new RoomService();
    }

    return RoomService.roomService;
  }

  public createRoom() {
    const room = new Room();
    this.rooms.set(room.id, room);
    return room;
  }

  public getRoom(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  public getAvailableRooms(): Room[] {
    return Array.from(this.rooms.values()).filter((room) => !room.isFull());
  }

  public updateAvailableRooms() {
    const freeRooms = this.getAvailableRooms();
    const availableRooms: { roomId: string; roomUsers: User[] }[] = [];
    freeRooms.forEach((room) => {
      availableRooms.push({
        roomId: room.id,
        roomUsers: room.players,
      });
    });

    return availableRooms;
  }
}

export default RoomService;
