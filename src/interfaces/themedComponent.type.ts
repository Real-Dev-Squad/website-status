export interface ThemedComponent{
    theme: boolean,
    themeSetter: (event: React.MouseEvent<HTMLImageElement>) => void
}