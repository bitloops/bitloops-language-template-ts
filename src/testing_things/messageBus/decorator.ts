interface IShape {
  draw(): void;
}

class Rectangle implements IShape {
  public draw(): void {
    console.log("Shape: Rectangle");
  }
}

class Circle implements IShape {
  public draw(): void {
    console.log("Shape: Circle");
  }
}

abstract class ShapeDecorator implements IShape {
  protected decoratedShape: IShape;

  constructor(decoratedShape: IShape) {
    this.decoratedShape = decoratedShape;
  }

  public draw(): void {
    this.decoratedShape.draw();
  }
}

class RedShapeDecorator extends ShapeDecorator {
  constructor(decoratedShape: IShape) {
    super(decoratedShape);
  }

  public draw(): void {
    this.decoratedShape.draw();
    this.setRedBorder(this.decoratedShape);
  }

  private setRedBorder(decoratedShape: IShape) {
    console.log("Border Color: Red");
  }
}

class DotsShapeDecorator extends ShapeDecorator {
  constructor(decoratedShape: IShape) {
    super(decoratedShape);
  }

  public draw(): void {
    this.decoratedShape.draw();
    this.setExtraDots(this.decoratedShape);
  }

  private setExtraDots(decoratedShape: IShape) {
    console.log("With extra: dots");
  }
}

const circle = new Circle();
const rectangle = new Rectangle();

const redCircle = new RedShapeDecorator(circle);

const redRectangle = new RedShapeDecorator(rectangle);

const redCircleWithDots = new DotsShapeDecorator(redCircle);

console.log("Circle with normal border");
circle.draw();

console.log("\nCircle of red border");
redCircle.draw();

console.log("\nRectangle of red border");
redRectangle.draw();

console.log("\nCircle of red border with dots");
redCircleWithDots.draw();

////
interface IMessage { }

type SubscriberHandler = (message: IMessage) => void;

interface IMessageBus {
  subscribe(topic: string, subscriberHandler: SubscriberHandler): Promise<void>;
  unsubscribe(
    topic: string,
    subscriberHandler: SubscriberHandler
  ): Promise<void>;
  publish(topic: string, message: IMessage): Promise<void>;
  getSubscriberHandlers(topic: string): SubscriberHandler[];
}

// class MessageBusDecorator

abstract class MessageBusDecorator implements IMessageBus {
  protected decoratedMessageBus: IMessageBus;
  constructor(decoratedMessageBus: IMessageBus) {
    this.decoratedMessageBus = decoratedMessageBus;
  }

  public subscribe(
    topic: string,
    subscriberHandler: SubscriberHandler
  ): Promise<void> {
    return this.decoratedMessageBus.subscribe(topic, subscriberHandler);
  }

  public publish(topic: string, message: IMessage): Promise<void> {
    return this.decoratedMessageBus.publish(topic, message);
  }

  public unsubscribe(
    topic: string,
    subscriberHandler: SubscriberHandler
  ): Promise<void> {
    return this.decoratedMessageBus.unsubscribe(topic, subscriberHandler);
  }

  public getSubscriberHandlers(topic: string): SubscriberHandler[] {
    return this.decoratedMessageBus.getSubscriberHandlers(topic);
  }
}

interface IExternalMessageBus extends IMessageBus {
  connect(): Promise<void>;
}

class ExternalMessageBusDecorator extends MessageBusDecorator {
  constructor(
    decoratedMessageBus: IMessageBus,
    private externalMessageBus: IExternalMessageBus
  ) {
    super(decoratedMessageBus);
  }

  // public draw(): void {
  //   this.decoratedMessageBus.draw();
  //   this.setRedBorder(this.decoratedShape);
  // }

  // private setRedBorder(decoratedShape: IShape) {
  //   console.log("Border Color: Red");
  // }

  public async subscribe(
    topic: string,
    subscriberHandler: SubscriberHandler
  ): Promise<void> {
    // return this.decoratedMessageBus.subscribe(topic, subscriberHandler);
    await Promise.all([
      this.decoratedMessageBus.subscribe(topic, subscriberHandler),
      this.externalMessageBus.subscribe(topic, subscriberHandler),
    ]);
  }
}
