import { createLogger, format, transports } from 'winston';

const simple = format.combine(
  format.align(),
  format.colorize({ all: true, colors: { info: 'blue', notice: 'green' } }),
  format.printf(({ message }) => message)
);

const levels = { debug: 7, error: 3, info: 6, notice: 5, warning: 4 };

const logger = createLogger({
  format: simple,
  levels,
  transports: [new transports.Console()]
});

export { logger };
