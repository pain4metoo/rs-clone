import click from '../../../../assets/sound/click.mp3';

export class AudioEl {
  constructor() {
    const audio = new Audio();
    audio.src = click;
  }

  public play(): void {}

  public stop(): void {}

  public off(): void {}

  public on(): void {}
}
