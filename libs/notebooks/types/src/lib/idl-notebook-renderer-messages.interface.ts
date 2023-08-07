import {
  IDLNotebookEmbeddedItem,
  IDLNotebookEncodedPNG,
} from './idl-notebook-embedded.interface';

/**
 * Message when we want to save an animation
 */
export type SaveImageAnimationRendererMessage = 'save-animation';

/**
 * Message when we save to save an image
 */
export type SaveImageRendererMessage = 'save-image';

/**
 * All messages that we send
 */
export type IDLNotebookRendererMessageType =
  | SaveImageAnimationRendererMessage
  | SaveImageRendererMessage;

/**
 * Typed-payloads for renderer messages
 */
export type IDLNotebookRendererMessagePayload<
  T extends IDLNotebookRendererMessageType
> = T extends SaveImageRendererMessage
  ? IDLNotebookEmbeddedItem<IDLNotebookEncodedPNG>
  : never;

/**
 * Data structure for notebook renderer messages
 */
export type IDLNotebookRendererMessage<
  T extends IDLNotebookRendererMessageType
> = {
  /**
   * Type of the message
   */
  type: T;
  /**
   * Payload for the message
   */
  payload: IDLNotebookRendererMessagePayload<T>;
};
