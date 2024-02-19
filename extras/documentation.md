
# Documentation

ModernPrimula is currently released as a "preview-beta".

What this means is that I cannot promise full functionality as of right now, but that I will continue to work on the application so that it can be released on all platforms (macOS, Windows & Linux).

For now, the application seems to be working correctly on Windows with all features implemented, but use at your own risk.

Windows is like I said supported, but I have signed it with a self-signed certificate, meaning that it will say that the "application can be dangerous", simply ignore that message and install it regardless -> all that it is complaining about is that it cannot verifiy online that the certificate is actually from me (since I do not own a code-sigining cerificate).

MacOS will be supported fully, however the main concern is that for it to happen, I must get a code-signing certificate from Apple (which is around $100), so until then -> autoUpdates and installation via the releases section will not work correctly. There are of course paths around this issue, but most of them can get quite technical so I have outlined the most simple way below on how to compile the program yourself and install it that way.

Linux is currently not supported, meaning that I haven't tested it yet, so feel free to compile it and see if it works. I will update the main readme.md file with the versions that are supported etc.

### Requirements

- NodeJS must be installed

# macos-installation

Since Apple does not allow installation of non-signed applications to be installed, the only way to install the application on macOS is to compile it yourself and then install it.

To install on macOS, follow the steps below to compile the application:

1. [Download](https://github.com/archways404/modernprimulaapp/archive/refs/heads/main.zip) or Clone the [Repository](https://github.com/archways404/modernprimulaapp)

2. If you downloaded the files, unzip them

3. Open up your terminal (ex: "Terminal" on MacOS)

4. Now use the command "cd" to navigate to the destination where you have saved or cloned the files

ex:

Navigate to desktop:

```bash
cd Downloads
```

List all the files:

```bash
ls
```

Navigate to the downloaded folder:

```bash
cd ModernPrimulaApp-main
```

Navigate to the source folder:

```bash
cd source
```

5. Install the node modules

```bash
npm install
```

6. Run the program

```bash
npm run build:mac
```

7. Run the installer

Open up finder and navigate to:

```bash
/Downloads/ModernPrimulaApp-main/source/dist
```

And then you can simply run the installer (.dmg file), and follow the instructions on-screen.

8. When you need to update the program, simply uninstall the current version of ModernPrimula and repeat the steps outlined above.


# windows-installation

To install on Windows, you can either download the installer from the releases section of the repository OR follow the steps below to compile the application:

1. [Download](https://github.com/archways404/modernprimulaapp/archive/refs/heads/main.zip) or Clone the [Repository](https://github.com/archways404/modernprimulaapp)

2. If you downloaded the files, unzip them

3. Open up your terminal (ex: "Powershell" or "CMD" on Windows)

4. Now use the command "cd" to navigate to the destination where you have saved or cloned the files

ex:

Navigate to desktop:

```bash
cd Downloads
```

List all the files:

```bash
ls
```

Navigate to the downloaded folder:

```bash
cd ModernPrimulaApp-main
```

Navigate to the source folder:

```bash
cd source
```

5. Install the node modules

```bash
npm install
```

6. Run the program

```bash
npm run build:win
```

7. Run the installer

Open up finder and navigate to:

```bash
/Downloads/ModernPrimulaApp-main/source/dist
```

And then you can simply run the installer (setup.exe file), and follow the instructions on-screen.

8. When you need to update the program you can either use the "autoUpdate" function OR you can reinstall it by uninstalling the current version of ModernPrimula and repeat the steps outlined above.


# Running in dev mode 

1. [Download](https://github.com/archways404/modernprimulaapp/archive/refs/heads/main.zip) or Clone the [Repository](https://github.com/archways404/modernprimulaapp)

2. If you downloaded the files, unzip them and place them on ex the Desktop

3. Open up your terminal ("CMD" on windows, "Terminal" on MacOS & Linux)

4. Now use the command "cd" to navigate to the destination where you have saved or cloned the files

ex:

Navigate to desktop:

```bash
cd Downloads
```

List all the files:

```bash
ls
```

Navigate to the downloaded folder:

```bash
cd ModernPrimulaApp-main
```

Navigate to the source folder:

```bash
cd source
```

5. Install the node modules

```bash
npm install
```

6. Run the program

```bash
npm run dev
```

The application should now be running!

#

***NOTE Video is old, but the core instructions still remains the same***

[INSTALL VIDEO](https://drive.google.com/file/d/1O3tFHcgZIbvAfvvdKWqfjVGjj_zfxrmB/view?usp=sharing)
