import java.util.Scanner;

public class Kalkulacka {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.println("""
                Zadajte číslo operácie ktorú chcete uskutočniť :
                1. PLUS
                2. MINUS
                3. NÁSOBENIE
                4. DELENIE
                Číslo Operácie: """);

        if (!input.hasNextInt()) {
            System.out.println("Prosím, zadajte celé číslo pre operáciu.");
            return;
        }
        int cisloOperacie = input.nextInt();

        System.out.println("Zadajte prve cislo: ");
        double prveCislo = input.nextDouble();
        System.out.println("Zadajte druhe cislo: ");
        double druheCislo = input.nextDouble();

        Kalkulacka kalk = new Kalkulacka();
        double vysledok = 0;

        switch (cisloOperacie) {
            case 1 -> System.out.println("Výsledok sčítania: " + kalk.plus(prveCislo, druheCislo));
            case 2 -> System.out.println("Výsledok odčítania: " + kalk.minus(prveCislo, druheCislo));
            case 3 -> System.out.println("Výsledok násobenia: " + kalk.multiply(prveCislo, druheCislo));
            case 4 -> {
                if (druheCislo == 0) {
                    System.out.println("Chyba: delenie nulou nie je povolené!");
                } else {
                    System.out.println("Výsledok delenia: " + kalk.divide(prveCislo, druheCislo));
                }
            }
            default -> throw new IllegalArgumentException("Číslo operácie neplatné!");
        }

        input.close();
    }

    public Double plus(Double a, Double b) {
        return a + b;
    }

    public Double minus(Double a, Double b) {
        return a - b;
    }

    public Double multiply(Double a, Double b) {
        return a * b;
    }

    public Double divide(Double a, Double b) {
        return a / b;
    }

}
