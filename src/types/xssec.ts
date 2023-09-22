export interface TokenInfo {
  reset(enc: string): void;
  isDecoded(): boolean;
  isValid(): boolean;
  getErrorObject(): any;
  getTokenValue(): string | undefined;
  getHeader(): any;
  getPayload(): any;
  getExpirationDate(): Date | null;
  getIssuedAt(): Date | null;
  getIssuer(): string;
  getCustomIssuer(): string | null;
  getSubject(): string;
  getAudiencesArray(): string[] | null;
  getUserId(): string;
  getZoneId(): string;
  getAppTID(): string;
  getClientId(): string | null;
  isTokenIssuedByXSUAA(): boolean;
  verify(
    verificationKeySupplier: any,
    cb: (err: any, token: this) => void,
  ): void;
}
