# Note - Entire backend for [Speech Buddy](https://uuutsav.github.io/speech-buddy-client/) has been dropped and is no longer relevant.
# Setting Up

- Make parent repository (Skip if already done)
```
mkdir speech-buddy
```
```
cd speech-buddy
```
- Clone server file
```
git clone https://github.com/uuutsav/speech-buddy-server.git
```
- Check out client repository
 [Client Repo](https://github.com/uuutsav/speech-buddy-client).


```
cd speech-buddy-server
```

- Go to [Assembly AI](https://www.assemblyai.com/) and generate an API KEY.
- Create a .env file with AssemblyAI API Key in it, named - 'ASSEMBLY_AI_API_KEY'.

```
npm i
npm run dev
```
