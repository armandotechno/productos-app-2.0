import { StyleSheet, Text } from 'react-native';

interface Props {
    message: string;
}

export const ErrorMessage = ({ message }: Props) => {
    return (
      <>
        <Text style={ styles.error }>{ message }</Text>
      </>
    )
}

const styles = StyleSheet.create({
    error: {
        textAlign: "center",
        color: "#fff",
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold"
      },
});
