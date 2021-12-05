export interface ILaunch {
   id: string;
   provider: string;
}

export interface IEvent {
   id: number;
   provider: string;
}

export interface IFlight {
   id: number;
   title: string;
   url: string;
   imageUrl: string;
   newsSite: string;
   summary: string;
   publishedAt: Date;
   updatedAt: Date;
   featured: boolean;
   launches: ILaunch[];
   events: IEvent[];
}